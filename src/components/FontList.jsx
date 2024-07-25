import { useRecoilState } from 'recoil';
import { fontList } from '../constants';
import { fontState } from '../atoms';
import { List, ListItem, Radio } from 'konsta/react';
import { useNavigate } from 'react-router-dom';

const FontList = () => {
  const [font, setFont] = useRecoilState(fontState);
  const navigate = useNavigate();
  return (
    <List strongIos outlineIos defaultChecked={font}>
      {Object.entries(fontList).map(([name, fontFamily]) => (
        <ListItem
          key={name}
          label
          title={name}
          style={{ fontFamily }}
          media={
            <Radio
              component="div"
              value={name}
              checked={font === name}
              onChange={() => {
                setFont(name)
                navigate(-1)
              }}
            />
          }
        />
      ))}
    </List>
  );
};

export default FontList;
