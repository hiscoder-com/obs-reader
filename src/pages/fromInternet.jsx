import { useEffect } from 'react';
import { Block } from 'konsta/react';
import LanguageSelector from '../components/LanguageSelector';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atoms';

export default function FromInternetPage() {
  const setTitle = useSetRecoilState(titleState);

  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LanguageSelector />
    </Block>
  );
}
