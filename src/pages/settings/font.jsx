import { BlockTitle } from 'konsta/react';
import { useSetRecoilState } from 'recoil';
import { subtitleState } from '../../atoms';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FontList from '../../components/FontList';

export default function FontPage() {
  const setSubtitle = useSetRecoilState(subtitleState);
  const {t} = useTranslation()

  useEffect(() => {
    setSubtitle(t('Settings'));
  }, [setSubtitle, t]);
  return (
    <>
      <BlockTitle>{t('Font')}</BlockTitle>
      <FontList />
    </>
  );
}
