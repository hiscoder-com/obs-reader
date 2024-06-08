import { useEffect } from 'react';
import { Block } from 'konsta/react';
import LanguageAppSelector from '../components/LanguageAppSelector';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atoms';

export default function LanguageAppPage() {
  const setTitle = useSetRecoilState(titleState);

  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LanguageAppSelector goTo={'/app/'} />
    </Block>
  );
}
