import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from './helper';
import './App.css';
import UploadResources from './Upload';

function App() {
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
        setMarkdown(res.data);
      });
  };
  return (
    <>
      <h1>axios-cache-interceptor</h1>
      <div className="card">
        <UploadResources />
        <br />
        <input value={story} onChange={(e) => setStory(e.target.value)} />{' '}
        <br />
        <button onClick={getStory}>Load</button>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
}

export default App;
