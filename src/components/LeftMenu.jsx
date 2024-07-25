import { Icon, Link, List, ListItem, Navbar, Page, Panel } from 'konsta/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { directionAppState, directionState, languageState, storyState } from '../atoms';
import axios from 'axios';
import { langList } from '../constants';
import { Xmark } from 'framework7-icons/react';
import { MdClose } from 'react-icons/md';

export default function LeftMenu({ leftPanelOpened, setLeftPanelOpened }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const direction = useRecoilValue(directionState);
  const directionApp = useRecoilValue(directionAppState);
  const [story, setStory] = useRecoilState(storyState);
  const language = useRecoilValue(languageState);
  const resetLanguage = useResetRecoilState(languageState);
  const [stories, setStories] = useState('');

  useEffect(() => {
    const baseUrl = language.startsWith('user-') ? 'https://git.door43.org/bsa/' : 'https://git.door43.org/'
    axios
      .get(
        baseUrl +
        (langList[language] ?? (language + '/')) +
        'toc.json', {
        headers: {
          Accept: 'application/json',
        }
      }
      )
      .then(({ data }) => {
        setStories(
          JSON.parse(data).map((_, index) => (
            <ListItem
              key={index}
              component={RouterLink}
              title={<div className={_.file === story ? 'font-bold' : ''}>{_.title}</div>}
              onClick={() => {
                setStory(_.file);
                setLeftPanelOpened(false)
              }}
              to={`/${language}/${_.file}`}
            />
          ))
        );
      }).catch((err) => {
        console.log(err);
        resetLanguage();
        navigate('/', { replace: true });
      });

  }, [language, navigate, resetLanguage, setLeftPanelOpened, setStory, story, t]);
  return (
    <Panel
      side={directionApp === 'rtl' ? 'right' : 'left'}
      size="h-screen w-96 max-w-[80vw]"
      opened={leftPanelOpened}
      onBackdropClick={() => setLeftPanelOpened(false)}
    >
      <Page colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}>
        <Navbar
          title={t('TOC')}
          className='border-b border-figma-border-light dark:border-figma-border-dark'
          colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}
          right={
            <Link navbar onClick={() => setLeftPanelOpened(false)}>
              <Icon ios={<Xmark className="w-7 h-7" />} material={<MdClose className="w-6 h-6" />} />
            </Link>
          }
        />
        <List margin='mt-0 mb-8' style={{ direction }}>
          {stories}
        </List>
      </Page>
    </Panel>
  );
}
