import { useRecoilValue } from 'recoil';
import { directionState, fontSizeState, fontState, languageState, showImagesState } from '../atoms';
import { Card } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { fontList, langList } from '../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MdToJson from '@texttree/obs-format-convert-rcl/dist/components/MdToJson';

const SettingsExample = () => {
  const { t } = useTranslation();
  const font = useRecoilValue(fontState);
  const direction = useRecoilValue(directionState);
  const [story, setStory] = useState('')
  const lang = useRecoilValue(languageState);
  const fontSize = useRecoilValue(fontSizeState);
  const showImages = useRecoilValue(showImagesState);
  useEffect(() => {
    const baseUrl = lang.startsWith('user-') ? 'https://git.door43.org/bsa/' : 'https://git.door43.org/'
    axios
      .get(
        baseUrl +
        (langList[lang] ?? (lang + '/')) +
        '01' +
        '.md'
      )
      .then((res) => {
        const jsonData = MdToJson(res.data);
        setStory(jsonData.verseObjects[0].text);
      }).catch((err) => {
        console.log(err);
        setStory(t('Story-1-1'));
      });

  })
  return (
    <Card raised colors={{ bgIos: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark', bgMaterial: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark' }} style={{ direction }}>
      {showImages === '1' ? (
        <img
          src="/images/obs-en-01-01.jpg"
        />
      ) : (
        ''
      )}
      <p className='my-2'
        style={{
          fontSize: `${parseInt(fontSize)}px`,
          lineHeight: `${parseInt(parseInt(fontSize) * 1.4)}px`,
          fontFamily: font === 'default' ? '' : fontList[font],
        }}
      >
        {story}
      </p>
    </Card>
  );
};

export default SettingsExample;
