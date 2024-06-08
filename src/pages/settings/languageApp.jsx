import { Block } from 'konsta/react';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../../atoms';
import { useEffect } from 'react';
import LanguageAppSelector from '../../components/LanguageAppSelector';
export default function LanguagePage() {
  const setTitle = useSetRecoilState(titleState);
  useEffect(() => {
    setTitle('Language');
  }, [setTitle]);
  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LanguageAppSelector goTo={'/settings/'} />
    </Block>
  );
}
