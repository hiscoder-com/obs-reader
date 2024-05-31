import { Block } from 'konsta/react';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../../atoms';
import { useEffect } from 'react';
import LanguageSelector from '../../components/LanguageSelector';
export default function LanguagePage() {
  const setTitle = useSetRecoilState(titleState);
  useEffect(() => {
    setTitle('Language');
  }, [setTitle]);
  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LanguageSelector />
    </Block>
  );
}
