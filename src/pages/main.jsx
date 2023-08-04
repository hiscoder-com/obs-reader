import { useState } from 'react';
import UploadResources from '../components/Upload';
import { Block } from 'konsta/react';

export default function MainPage() {
  const [story, setStory] = useState('01');
  return (
    <Block>
      <h1>Open Bible Stories</h1>
      <div className="card">
        <UploadResources />
        <br />
        <input value={story} onChange={(e) => setStory(e.target.value)} />{' '}
        <br />
      </div>
    </Block>
  );
}
