import { useEffect, useState } from 'react';
import { Block, Button } from 'konsta/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { languageAppState, storyState, titleState } from '../atoms';
import { loadToCache } from '../helper';
import { useNavigate } from 'react-router-dom';
import { languages } from '../constants';
import { useTranslation } from 'react-i18next';

export default function FromDevicePage() {
  const { t } = useTranslation()
  const setTitle = useSetRecoilState(titleState);
  const languageApp = useRecoilValue(languageAppState);
  const [language, setLanguage] = useState(languageApp);
  const [openedLangList, setOpenedLangList] = useState(false)

  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  const story = useRecoilValue(storyState);
  const navigate = useNavigate();

  const onChange = (evt) => {
    let file = evt.target.files[0];
    let reader = new FileReader();
    try {
      reader.onload = async function () {
        await loadToCache(reader.result, language);
        navigate(`/${language}/${story}`);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <label className="block text-sm font-medium text-gray-900 leading-6 dark:text-white" htmlFor="file_input">Upload file</label>
      <input type="file" onChange={onChange} name="file" className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" id="file" accept=".zip" />
      <Button onClick={() => document.getElementById('file').click()}>Добавить</Button>
    </Block>
  );
}
