import { useRecoilValue, useSetRecoilState } from "recoil";
import { isRtlState, languageState, storyState } from "../atoms";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { langList } from "../constants";
import { Icon } from "konsta/react";
import { ChevronLeft, ChevronRight } from 'framework7-icons/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

function NavigationBlock() {
  const { lang, story } = useParams();
  const isRtl = useRecoilValue(isRtlState);
  const navigate = useNavigate();
  const setLanguage = useSetRecoilState(languageState);
  const [toc, setToc] = useState([])
  const [currentIndex, setCurrentIndex] = useState()
  const setStory = useSetRecoilState(storyState);
  const baseUrl = lang.startsWith('user-') ? 'https://git.door43.org/bsa/' : 'https://git.door43.org/'
  useEffect(() => {
    if (story) {
      setCurrentIndex(toc.findIndex(el => el === story))
    }
  }, [story, toc])
  useEffect(() => {
    axios
      .get(
        baseUrl +
        (langList[lang] ?? (lang + '/')) +
        'toc.json', {
        headers: {
          Accept: 'application/json',
        }
      }
      )
      .then(({ data }) => {
        setToc(JSON.parse(data).map(el => el.file))
      }).catch((err) => {
        console.log(err);
        localStorage.setItem('language', '');
        setLanguage('');
        navigate('/', { replace: true });
      });

  }, [baseUrl, lang, navigate, setLanguage])

  const goBackward = () => {
    if (currentIndex > 0) {
      setStory(toc[currentIndex - 1]);
      navigate(`/${lang}/${toc[currentIndex - 1]}`);
    }
  }

  const goForward = () => {
    if (currentIndex < toc.length - 1) {
      setStory(toc[currentIndex + 1]);
      navigate(`/${lang}/${toc[currentIndex + 1]}`);
    }
  }
  return (
    <><div onClick={() => isRtl === '1' ? goForward() : goBackward()} className="fixed bottom-4 md:hidden leading-[0] left-4 rounded-full p-3 border shadow-md bg-figma-bg-card-light/90 border-figma-border-light dark:border-figma-border-dark dark:bg-figma-bg-card-dark/90 cursor-pointer">
      <span>
        <Icon ios={<ChevronLeft className="w-6 h-6" />} material={<MdChevronLeft className="w-6 h-6" />} /></span>
    </div><div onClick={() => isRtl === '1' ? goBackward() : goForward()} className="fixed bottom-4 md:hidden leading-[0] right-4 rounded-full p-3 border shadow-md bg-figma-bg-card-light/90 border-figma-border-light dark:border-figma-border-dark dark:bg-figma-bg-card-dark/90 cursor-pointer">
        <Icon ios={<ChevronRight className="w-6 h-6" />} material={<MdChevronRight className="w-6 h-6" />} />
      </div></>
  )
}

export default NavigationBlock
