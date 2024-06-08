import { List, ListItem, BlockTitle, Icon } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { languageAppState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { countries, languagesApp } from '../constants';

const LanguageAppSelector = ({ goTo }) => {
  const setLanguageApp = useSetRecoilState(languageAppState);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const onLanguageChange = (lang) => {
    setLanguageApp(lang);
    i18n.changeLanguage(lang);
    const lsLanguage = localStorage.getItem('languageApp');
    if (lang !== lsLanguage) {
      localStorage.setItem('languageApp', lang);
    }
    navigate(goTo);
  }
  return (
    <>
      <BlockTitle>{t('chooseLanguageApp')}</BlockTitle>
      <List>
        {languagesApp.map((lang, index) => {
          const CountryIcon = countries[lang]
          return (
            <ListItem
              key={index}
              title={t(`languages.${lang}`)}
              onClick={() => onLanguageChange(lang)}
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

export default LanguageAppSelector;
