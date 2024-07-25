import { useEffect, useState } from 'react';
import { Block, BlockTitle } from 'konsta/react';
import LanguageSelector from '../components/LanguageSelector';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atoms';
import { useTranslation } from 'react-i18next';

export default function FromInternetPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const setTitle = useSetRecoilState(titleState);

  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <BlockTitle>{t('chooseLanguage')}</BlockTitle>
      <LanguageSelector loading={loading} setLoading={setLoading} />
    </Block>
  );
}
