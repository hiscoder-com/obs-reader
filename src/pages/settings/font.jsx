import { useSetRecoilState } from 'recoil';
import { titleState } from '../../atoms';
import { useEffect } from 'react';
import FontList from '../../components/FontList';

export default function FontPage() {
  const setTitle = useSetRecoilState(titleState);

  useEffect(() => {
    setTitle('Font');
  }, [setTitle]);
  return (
    <div className="mt-5 mx-auto max-w-4xl">
      <FontList />
    </div>
  );
}
