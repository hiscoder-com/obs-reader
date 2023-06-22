import { useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import axios from './helper2';
import localforage from 'localforage';

function App2() {
  const [markdown, setMarkdown] = useState('');
  const [story, setStory] = useState('01');
  const getStory = () => {
    axios
      .get(
        'https://git.door43.org/ru_gl/ru_obs/raw/branch/master/content/' +
          story +
          '.md'
      )
      .then((res) => {
        console.log({fromCache: !!res.request?.fromCache});
        setMarkdown(res.data);
      });
  };
  const createNew = () => {
    const cacheStore = localforage.createInstance({
      driver: [localforage.INDEXEDDB],
      name: 'web-cache',
    });
    cacheStore
      .setItem(
        'get+https://git.door43.org/ru_gl/ru_obs/raw/branch/master/content/99.md',
        {"expires":1687468986950,"data":{"data":"# 1. test\n\n_Библейская история из Бытия 1-2_\n","status":200,"statusText":"OK","headers":{"cache-control":"private, max-age=300","content-disposition":"inline; filename=\"99.md\"; filename*=UTF-8''99.md","content-type":"text/plain; charset=utf-8","last-modified":"Thu, 06 May 2021 09:48:18 GMT"}}}
      )
      .then(function () {
        console.log('success');
      })
      .then(function (value) {
        console.log({ value });
      })
      .catch(function (err) {
        console.log({ err });
      });
  }
  return (
    <>
      <h1>axios-cache-adapter</h1>
      <div className="card">
        <input value={story} onChange={(e) => setStory(e.target.value)} />{' '}
        <br />
        <button onClick={getStory}>Load</button>
        <button onClick={createNew}>Create</button>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
}

export default App2;
