import { List, ListItem, BlockTitle, Icon } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { languageState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { countries, languages } from '../constants';

const LanguageSelector = () => {
  const setLanguage = useSetRecoilState(languageState);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const onLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    const lsLanguage = localStorage.getItem('language');
    if (lang !== lsLanguage) {
      localStorage.setItem('language', lang);
    }
    navigate(`/${lang}/`);
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
