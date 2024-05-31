import { Card, Icon } from 'konsta/react';
import { MdFolderOpen } from 'react-icons/md';
import { Folder } from 'framework7-icons/react';
import { loadToCache } from '../helper';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoadFromDevice = ({ language }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const onChange = (evt) => {
    setLoading(true);
    let file = evt.target.files[0];
    let reader = new FileReader();
    try {
      reader.onload = async function () {
        await loadToCache(reader.result, language);
        setLoading(false);
        navigate(`/${language}/01`);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setLoading(false);
      console.log(err)
    }
  };

  return (
    <>
      <Card className='flex items-center flex-col' header={<p className='text-lg'>{t('LoadFromDevice')}</p>}>
        <label htmlFor="file">
          <div className={`rounded-full border-2 w-18 h-18 flex justify-center items-center ${loading ? 'border-gray-500 text-gray-500  animate-pulse cursor-wait' : ' cursor-pointer border-primary text-primary'}`}>
            <Icon ios={<Folder className="w-7 h-7" />}
              material={<MdFolderOpen className="w-7 h-7" />} />
          </div>
          <input type="file" onChange={onChange} name="file" className="hidden" id="file" accept=".zip" />
        </label>
      </Card>
    </>
  );
};

export default LoadFromDevice;
