import { useEffect } from 'react';
import { Block } from 'konsta/react';
import LanguageAppSelector from '../components/LanguageAppSelector';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { languageState, storyState, titleState } from '../atoms';
import { useNavigate } from 'react-router-dom';

export default function LanguageAppPage() {
  const setTitle = useSetRecoilState(titleState);
  const language = useRecoilValue(languageState)
  const story = useRecoilValue(storyState)
  const navigate = useNavigate()
  useEffect(() => {
    if (language) {
      navigate('/' + language + '/' + story, { replace: true })
    }

  }, [language, navigate, story])
  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <LanguageAppSelector goTo={'/app/'} />
    </Block>
  );
}
