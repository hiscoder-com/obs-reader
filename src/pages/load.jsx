import { useEffect } from 'react';
import { Block } from 'konsta/react';
import LoadFromInternet from '../components/LoadFromInternet';
import LoadFromDevice from '../components/LoadFromDevice';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { languageState, titleState } from '../atoms';

export default function LoadPage() {
  const setTitle = useSetRecoilState(titleState);
  const language = useRecoilValue(languageState);

  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LoadFromInternet language={language} />
      <LoadFromDevice language={language} />
    </Block>
  );
}
