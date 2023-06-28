import { useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import axios from './helper2';
import UploadResources from './Upload';

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

  return (
    <>
      <h1>axios-cache-adapter</h1>
      <div className="card">
        <input value={story} onChange={(e) => setStory(e.target.value)} />
        <br />
        <button onClick={getStory}>Load</button>
        <UploadResources />
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
}

export default App2;
