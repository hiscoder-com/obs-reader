import { useEffect } from 'react';
import { Block, Card, Icon } from 'konsta/react';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atoms';
import { useTranslation } from 'react-i18next';
import { CloudDownload, Folder } from 'framework7-icons/react';
import { MdCloudDownload, MdFolderOpen } from 'react-icons/md';
import { Link } from 'konsta/react';
import { Link as RouterLink } from 'react-router-dom';

export default function LoadFromPage() {
  const setTitle = useSetRecoilState(titleState);
  const { t } = useTranslation();
  useEffect(() => {
    setTitle('OpenBibleStories');
  }, [setTitle]);

  return (
    <Block className="mt-5 mx-auto max-w-4xl">
      <Link to="/app/internet/" component={RouterLink} className='w-full'>
        <Card colors={{ bgIos: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark', bgMaterial: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark' }} raised className='flex items-center flex-col w-full' header={<p className='text-lg'>{t('LoadFromInternet')}</p>}>
          <div className={`rounded-full border-2 w-18 h-18 flex justify-center items-center cursor-pointer border-primary text-primary`}>
            <Icon ios={<CloudDownload className="w-7 h-7" />}
              material={<MdCloudDownload className="w-7 h-7" />} />
          </div>
        </Card>
      </Link>
      <Link to="/app/device/" component={RouterLink} className='w-full'>
        <Card colors={{ bgIos: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark', bgMaterial: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark' }} raised className='flex items-center flex-col w-full' header={<p className='text-lg'>{t('LoadFromDevice')}</p>}>
          <div className={`rounded-full border-2 w-18 h-18 flex justify-center items-center cursor-pointer border-primary text-primary`}>
            <Icon ios={<Folder className="w-7 h-7" />}
              material={<MdFolderOpen className="w-7 h-7" />} />
          </div>
        </Card>
      </Link>
    </Block>
  );
}
