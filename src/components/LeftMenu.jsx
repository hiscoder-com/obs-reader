import { BlockTitle, List, ListItem, Page, Panel } from 'konsta/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { languageState } from '../atoms';

export default function LeftMenu({ leftPanelOpened, setLeftPanelOpened }) {
  const { t } = useTranslation();
  const language = useRecoilValue(languageState);
  const [stories, setStories] = useState('');
  useEffect(() => {
    setStories(
      Array(50)
        .fill()
        .map((_, index) => (
          <ListItem
            key={index}
            component={RouterLink}
            title={t('Story' + (index + 1).toString().padStart(2, '0'))}
            onClick={() => setLeftPanelOpened(false)}
            to={`/${language}/${(index + 1).toString().padStart(2, '0')}`}
          />
        ))
    );
  }, [t]);
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
