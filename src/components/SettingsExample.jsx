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
    <Card raised colors={{ bgIos: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark', bgMaterial: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark' }}>
      {showImages === '1' ? (
        <img
          src="/images/obs-en-01-01.jpg"
        />
      ) : (
        ''
      )}
      <p className='my-2'
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
