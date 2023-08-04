import { useRecoilState } from 'recoil';
import { fontList } from '../constants';
import { fontState } from '../atoms';
import { useEffect } from 'react';
import { List, ListItem, Radio } from 'konsta/react';

const FontList = () => {
  const [font, setFont] = useRecoilState(fontState);
  useEffect(() => {
    const lsFont = localStorage.getItem('font');
    if (font !== lsFont) {
      localStorage.setItem('font', font);
    }
  }, [font]);
  return (
    <List strongIos outlineIos defaultChecked={font}>
      {Object.entries(fontList).map(([name]) => (
        <ListItem
          key={name}
          label
          title={name}
          media={
            <Radio
              component="div"
              value={name}
              checked={font === name}
              onChange={() => setFont(name)}
            />
          }
        />
      ))}
    </List>
  );
};

export default FontList;
