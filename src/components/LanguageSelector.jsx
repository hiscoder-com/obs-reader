import { List, ListItem, BlockTitle, Icon } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { languageState, storyState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { countries, langList, languages } from '../constants';
import { storage } from '../helper';
import { useEffect, useState } from 'react';

const LanguageSelector = () => {
  const setLanguage = useSetRecoilState(languageState);
  const story = useRecoilValue(storyState);
  const navigate = useNavigate();
  const [availableLangs, setAvailableLangs] = useState()

  useEffect(() => {
    const getAvailableLangs = async () => {
      const _availableLangs = await Promise.all(languages.map((lang) => storage.getItem('get+https://git.door43.org/' + langList[lang] + 'toc.json').then(res => res !== null)))
      setAvailableLangs(_availableLangs)
    }
    getAvailableLangs()
  }, [])


  const { t, i18n } = useTranslation();
  const onLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    const lsLanguage = localStorage.getItem('language');
    if (lang !== lsLanguage) {
      localStorage.setItem('language', lang);
    }
    console.log({ story })
    if (availableLangs[languages.indexOf(lang)]) {
      navigate(`/${lang}/${story}`);
    } else {
      navigate(`/${lang}/`);
    }
  }
  return (
    <>
      <BlockTitle>{t('chooseLanguage')}</BlockTitle>
      <List>
        {languages.map((lang, index) => {
          const CountryIcon = countries[lang]
          return (
            <ListItem
              key={index}
              title={t(`languages.${lang}`)}
              onClick={() => onLanguageChange(lang)}
              colors={{ primaryTextIos: availableLangs?.[index] ? '' : 'text-gray-500 dark:text-gray-400', primaryTextMaterial: availableLangs?.[index] ? '' : 'text-gray-500 dark:text-gray-400' }}
              after={availableLangs?.[index] ? t('loaded') : ''}
              link
              media={<Icon ios={<CountryIcon className="w-6 h-4" />}
                material={<CountryIcon className="w-6 h-4" />} />}
            />
          )
        })}
      </List>
    </>
  );
};

export default LanguageSelector;
