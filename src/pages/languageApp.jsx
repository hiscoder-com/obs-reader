import { useEffect } from 'react';
import { Block } from 'konsta/react';
import LanguageAppSelector from '../components/LanguageAppSelector';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atoms';
import { useNavigate } from 'react-router-dom';

export default function LanguageAppPage() {
  const setTitle = useSetRecoilState(titleState);
  const navigate = useNavigate()
  useEffect(() => {
    const language = localStorage.getItem('language')
    const story = localStorage.getItem('story')
    if (language) {
      navigate('/' + language + '/' + story, { replace: true })
    }

  }, [navigate])
  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LanguageAppSelector goTo={'/app/'} />
    </Block>
  );
}
