import {
  BlockTitle,
  Dialog,
  DialogButton,
  List,
  ListButton,
  ListItem,
  Range,
  Toggle,
} from 'konsta/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  darkModeState,
  fontSizeState,
  fontState,
  languageAppState,
  languageState,
  showImagesState,
  titleState,
} from '../../atoms';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { langStorage, storage } from '../../helper';
import { } from 'i18next';
import { useTranslation } from 'react-i18next';
import SettingsExample from '../../components/SettingsExample';
import { langList } from '../../constants';

export default function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const setTitle = useSetRecoilState(titleState);
  const language = useRecoilValue(languageState);
  const [langName, setLangName] = useState('')
  const languageApp = useRecoilValue(languageAppState);
  const font = useRecoilValue(fontState);
  const [showImages, setShowImages] = useRecoilState(showImagesState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);

  useEffect(() => {
    setTitle('Settings');
  }, [setTitle]);

  useEffect(() => {
    langList[language] ? setLangName(t(`languages.${language}`)) : langStorage.getItem(language.slice('5')).then(res => setLangName(res))
  }, [language, t])

  const [confirmOpened, setConfirmOpened] = useState(false);

  const clearCache = async () => {
    setConfirmOpened(false);
    localStorage.clear();
    try {
      let keys = await langStorage.keys()
      for (const el of keys) {
        await langStorage.removeItem(el);
      }
      keys = []
      keys = await storage.keys()
      for (const el of keys) {
        await storage.removeItem(el);
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/', { replace: true });
  };

  const showImagesHandler = () => {
    setShowImages((prev) => {
      const newValue = prev === '1' ? '0' : '1';
      localStorage.setItem('showImages', newValue);
      return newValue;
    });
  };

  const darkModeHandler = () => {
    setDarkMode((prev) => {
      const newValue = prev === '1' ? '0' : '1';
      localStorage.setItem('darkMode', newValue);
      return newValue;
    });
  };

  const fontSizeHandler = (e) => {
    localStorage.setItem('fontSize', parseInt(e.target.value));
    setFontSize(parseInt(e.target.value));
  };

  return (
    <div className="mt-5 mx-auto max-w-4xl">
      <List strongIos outlineIos insetIos>
        <ListItem
          link
          linkComponent={Link}
          linkProps={{ to: '/settings/language-app' }}
          title={t('LanguageApp')}
          after={t(`languages.${languageApp}`)}
        />
      </List>
      <BlockTitle>{t('Appearance')}</BlockTitle>
      <List strongIos outlineIos insetIos>
        <ListItem
          link
          linkComponent={Link}
          linkProps={{ to: '/settings/font' }}
          title={t('Font')}
          after={font}
        />
        <ListItem title={t('FontSize')} after={`${fontSize}px`} />
        <ListItem
          innerClassName="flex space-x-4 rtl:space-x-reverse"
          innerChildren={
            <>
              <Range
                value={fontSize}
                step={1}
                min={10}
                max={36}
                onChange={fontSizeHandler}
              />
            </>
          }
        />
        <ListItem
          label
          title={t('DarkMode')}
          component="div"
          after={
            <Toggle
              component="div"
              className="-my-1"
              checked={darkMode === '1'}
              onChange={darkModeHandler}
            />
          }
        />
        <ListItem
          label
          title={t('ShowImages')}
          component="div"
          after={
            <Toggle
              component="div"
              className="-my-1"
              checked={showImages === '1'}
              onChange={showImagesHandler}
            />
          }
        />
      </List>
      <SettingsExample />
      <BlockTitle>{t('Materials')}</BlockTitle>
      <List strongIos outlineIos insetIos>
        <ListItem
          link
          linkComponent={Link}
          linkProps={{ to: '/settings/language' }}
          title={t('Language')}
          after={langName}
        />
        <ListButton
          className="k-color-brand-red"
          component="div"
          onClick={() => setConfirmOpened(true)}
        >
          {t('ClearCache')}
        </ListButton>
      </List>
      <Dialog
        opened={confirmOpened}
        onBackdropClick={() => setConfirmOpened(false)}
        title={t('ClearCache')}
        content={t('DataRemoved')}
        buttons={
          <>
            <DialogButton onClick={() => setConfirmOpened(false)}>{t('No')}</DialogButton>
            <DialogButton
              strong
              onClick={() => {
                clearCache();
              }}
            >
              {t('Yes')}
            </DialogButton>
          </>
        }
      />
    </div>
  );
}
