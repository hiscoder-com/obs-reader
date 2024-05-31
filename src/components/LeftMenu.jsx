import { BlockTitle, List, ListItem, Page, Panel } from 'konsta/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { languageState } from '../atoms';
import axios from 'axios';
import { langList } from '../constants';

export default function LeftMenu({ leftPanelOpened, setLeftPanelOpened }) {
  const { t } = useTranslation();
  const language = useRecoilValue(languageState);
  const [stories, setStories] = useState('');
  useEffect(() => {
    axios
      .get(
        'https://git.door43.org/' +
        langList[language] +
        'toc'
      )
      .then(({ data }) => {
        setStories(
          JSON.parse(data).map((_, index) => (
            <ListItem
              key={index}
              component={RouterLink}
              title={_.title}
              onClick={() => setLeftPanelOpened(false)}
              to={`/${language}/${_.file}`}
            />
          ))
        );
      });

  }, [language, setLeftPanelOpened, t]);
  return (
    <Panel
      side="left"
      size="h-screen w-96 max-w-[80vw]"
      opened={leftPanelOpened}
      onBackdropClick={() => setLeftPanelOpened(false)}
    >
      <Page>
        <BlockTitle>{t('TOC')}</BlockTitle>
        <List strongIos outlineIos>
          {stories}
        </List>
      </Page>
    </Panel>
  );
}
