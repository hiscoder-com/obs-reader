import { useRecoilValue } from 'recoil';
import { fontSizeState, fontState, showImagesState } from '../atoms';
import { Card } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { fontList } from '../constants';

const SettingsExample = () => {
  const { t } = useTranslation();
  const font = useRecoilValue(fontState);
  const fontSize = useRecoilValue(fontSizeState);
  const showImages = useRecoilValue(showImagesState);
  return (
    <Card>
      {showImages === '1' ? (
        <img
          className="pb-2"
          src="/images/obs-en-01-01.jpg"
        />
      ) : (
        ''
      )}
      <p
        style={{
          fontSize: `${parseInt(fontSize)}px`,
          lineHeight: `${parseInt(parseInt(fontSize) * 1.4)}px`,
          fontFamily: font === 'default' ? '' : fontList[font],
        }}
      >
        {t('Story-1-1')}
      </p>
    </Card>
  );
};

export default SettingsExample;
