import { Block, BlockTitle, Button } from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../../atoms';
import { useEffect, useState } from 'react';
import LanguageSelector from '../../components/LanguageSelector';
import DeviceLanguageList from '../../components/DeviceLanguageList';
import { useTranslation } from 'react-i18next';
export default function LanguagePage() {
  const setTitle = useSetRecoilState(titleState);
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTitle('Language');
  }, [setTitle]);
  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <BlockTitle withBlock={false}>{t('chooseLanguage')}</BlockTitle>
      <p className='pl-4-safe pr-4-safe -mb-8 mt-4 font-bold'>{t('fromInternet')}</p>
      <LanguageSelector loading={loading} setLoading={setLoading} />
      {loading ? '' : <>
        <p className='pl-4-safe pr-4-safe -mb-8 mt-4 font-bold'>{t('fromDevice')}</p>
        <DeviceLanguageList />
        <Button onClick={() => { navigate('/app/device') }}>{t('add')}</Button>
      </>}
    </Block>
  );
}
