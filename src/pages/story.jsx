import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Block } from 'konsta/react';
import { langList } from '../constants';
import { MdToJson } from '@texttree/obs-format-convert-rcl/dist/components';
import { useSetRecoilState } from 'recoil';
import { subtitleState } from '../atoms';

export default function StoryPage() {
  const { lang, story } = useParams();
  const setSubtitle = useSetRecoilState(subtitleState);
  const [storyJson, setStoryJson] = useState({});
  useEffect(() => {
    axios
      .get(
        'https://git.door43.org/' +
          langList[lang] +
          String(story).padStart(2, '0') +
          '.md'
      )
      .then((res) => {
        const jsonData = MdToJson(res.data);
        setStoryJson(jsonData);
        setSubtitle(jsonData.title);
      });
  }, [lang, setSubtitle, story]);
  return (
    <Block>
      {storyJson?.verseObjects ? (
        storyJson?.verseObjects.map((verse) => (
          <Fragment key={verse.verse}>
            <img src={`https://cdn.door43.org/obs/jpg/360px/${verse.path}`} />
            <p>{verse.text}</p>
          </Fragment>
        ))
      ) : (
        <>Loadding...</>
      )}
      <p className="font-bold">{storyJson?.reference}</p>
    </Block>
  );
}
