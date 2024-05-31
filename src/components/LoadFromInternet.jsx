import { useState } from 'react';
import { Icon, Card } from 'konsta/react';
import { MdCloudDownload } from 'react-icons/md';
import { CloudDownload } from 'framework7-icons/react';
import { langList } from '../constants';
import axios from 'axios';
import { loadToCache } from '../helper';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LoadFromInternet = ({ language }) => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    axios.get(`https://git.door43.org/${langList[language].split('/raw/')[0]}/archive/master.zip`, {
      responseType: 'arraybuffer',
      cache: false
    }).then(res => {
      loadToCache(res.data, language);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
      navigate(`/${language}/01`);
    })
  };

  return (
    <>
      <Card className='flex items-center flex-col' header={t('LoadFromInternet')}>
        <div onClick={handleLoad} className={`rounded-full border-2 w-18 h-18 flex justify-center items-center ${loading ? 'border-gray-500 text-gray-500  animate-pulse cursor-wait' : ' cursor-pointer border-primary text-primary'}`}>
          <Icon ios={<CloudDownload className="w-7 h-7" />}
            material={<MdCloudDownload className="w-7 h-7" />} />
        </div>
      </Card>
    </>
  );
};

export default LoadFromInternet;
