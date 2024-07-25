import { List, ListItem, BlockTitle, Icon } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { directionAppState, languageAppState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { countries, languagesApp, rtlLanguages } from '../constants';

const LanguageAppSelector = ({ goTo }) => {
  const setLanguageApp = useSetRecoilState(languageAppState);
  const setDirectionApp = useSetRecoilState(directionAppState);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const onLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageApp(lang);
    setDirectionApp(rtlLanguages.includes(lang) ? 'rtl' : 'ltr');
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
