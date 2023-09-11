import { useRecoilState } from 'recoil';
import { langList } from '../constants';
import { languageState } from '../atoms';
import { useEffect } from 'react';
import { List, ListItem, Radio } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LanguageList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useRecoilState(languageState);
  useEffect(() => {
    i18n.changeLanguage(language);
    const lsLanguage = localStorage.getItem('language');
    if (language !== lsLanguage) {
      localStorage.setItem('language', language);
      navigate(-1);
    }
  }, [i18n, language, navigate]);

  const changeLanguageHandler = (name) => {
    setLanguage(name);
  };
  return (
    <List strongIos outlineIos defaultChecked={language}>
      {Object.entries(langList).map(([name]) => (
        <ListItem
          key={name}
          label
          title={t(name)}
          media={
            <Radio
              component="div"
              value={name}
              checked={language === name}
              onChange={() => changeLanguageHandler(name)}
            />
          }
        />
      ))}
    </List>
  );
};

export default LanguageList;
