import { Block, BlockTitle } from 'konsta/react';
import { useSetRecoilState } from 'recoil';
import { subtitleState } from '../../atoms';
import { useEffect } from 'react';
import LanguageList from '../../components/LanguageList';
import { useTranslation } from 'react-i18next';

export default function LanguagePage() {
  const setSubtitle = useSetRecoilState(subtitleState);
  const { t } = useTranslation();
  useEffect(() => {
    setSubtitle(t('Settings'));
  }, [setSubtitle, t]);
  return (
    <Block>
      <BlockTitle>{t('Language')}</BlockTitle>
      <LanguageList />
    </Block>
  );
}
