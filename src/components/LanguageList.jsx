import { useRecoilState } from 'recoil';
import { langList } from '../constants';
import { languageState } from '../atoms';
import { useEffect } from 'react';
import { List, ListItem, Radio } from 'konsta/react';
import { useTranslation } from 'react-i18next';

const LanguageList = () => {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useRecoilState(languageState);
  useEffect(() => {
    i18n.changeLanguage(language);
    const lsLanguage = localStorage.getItem('language');
    if (language !== lsLanguage) {
      localStorage.setItem('language', language);
    }
  }, [i18n, language]);
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
              onChange={() => setLanguage(name)}
            />
          }
        />
      ))}
    </List>
  );
};

export default LanguageList;
