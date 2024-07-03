import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Block } from 'konsta/react';
import { fontList, langList } from '../constants';
import MdToJson from '@texttree/obs-format-convert-rcl/dist/components/MdToJson';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  fontSizeState,
  fontState,
  languageState,
  showImagesState,
  subtitleState,
} from '../atoms';
import { useTranslation } from 'react-i18next';
import NavigationBlock from '../components/NavigationBlock';

export default function StoryPage() {
  const navigate = useNavigate();
  const { lang, story } = useParams();
  const { t } = useTranslation();
  const language = useRecoilValue(languageState);
  const font = useRecoilValue(fontState);
  const fontSize = useRecoilValue(fontSizeState);
  const showImages = useRecoilValue(showImagesState);
  const setSubtitle = useSetRecoilState(subtitleState);
  const [storyJson, setStoryJson] = useState({});
  useEffect(() => {
    if (lang !== language) {
      //navigate(`/${language}/${story}`);
    }
  }, [lang, language, navigate, story]);

  useEffect(() => {
    setStoryJson({});
    setSubtitle('...');
    localStorage.setItem('story', story);
    const baseUrl = lang.startsWith('user-') ? 'https://git.door43.org/bsa/' : 'https://git.door43.org/'
    axios
      .get(
        baseUrl +
        (langList[lang] ?? (lang + '/')) +
        String(story).padStart(2, '0') +
        '.md'
      )
      .then((res) => {
        const jsonData = MdToJson(res.data);
        setStoryJson(jsonData);
        setSubtitle(jsonData.title);
      }).catch((err) => {
        console.log(err);
        if (story === '01') {
          localStorage.removeItem('language');
        } else {
          localStorage.setItem('story', '01');
        }
        navigate('/', { replace: true });
      });
  }, [lang, navigate, setSubtitle, story]);

  return (
    <Block
      className="mt-5  mx-auto max-w-4xl"
      style={{
        fontSize: `${parseInt(fontSize)}px`,
        lineHeight: `${parseInt(parseInt(fontSize) * 1.4)}px`,
        fontFamily: font === 'default' ? '' : fontList[font],
      }}
    >
      {storyJson?.verseObjects ? (
        storyJson?.verseObjects.map((verse) => (
          <Fragment key={verse.verse}>
            {showImages === '1' ? (
              <img src={`/images/${verse.path}`} />
            ) : (
              ''
            )}
            <p className="mb-6 mt-2">{verse.text}</p>
          </Fragment>
        ))
      ) : (
        <>{t('Loading...')}</>
      )}
      <p className="ltr:italic mb-20" style={{ fontSize: '.9em' }}>{storyJson?.reference}</p>
      <NavigationBlock />
    </Block>
  );
}
