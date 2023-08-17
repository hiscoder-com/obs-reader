import JSZip from 'jszip';
import { useState } from 'react';
import { TTL, storage } from '../helper';
import { useRecoilValue } from 'recoil';
import { languageState } from '../atoms';
import { langList } from '../constants';

function UploadResources() {
  const [file, setFile] = useState();
  const language = useRecoilValue(languageState);

  const onChange = (evt) => {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      setFile(reader.result);
    };
    reader.readAsArrayBuffer(file);
  };

  const loadToLS = () => {
    if (!file) {
      return false;
    }
    const zip = new JSZip();
    zip.loadAsync(file).then(function (zip) {
      zip.forEach(function (relativePath, zipEntry) {
        console.log({ relativePath, zipEntry });
        if (
          !zipEntry.dir &&
          ['md'].includes(zipEntry.name.substring(zipEntry.name.length - 2))
        ) {
          const file = zipEntry.name.split('/').pop();
          zipEntry.async('string').then(
            function success(content) {
              storage.setItem('get+https://git.door43.org/' + langList[language] + file, {
                expires: Date.now() + TTL,
                state: 'cached',
                ttl: TTL,
                createdAt: Date.now(),
                data: {
                  data: content,
                  status: 200,
                  statusText: 'OK',
                  headers: {
                    'cache-control': 'private, max-age=' + TTL,
                    'content-disposition':
                      'inline; filename="' + file + "\"; filename*=UTF-8''" + file,
                    'content-type': 'text/plain; charset=utf-8',
                    'last-modified': 'Thu, 06 May 2021 09:48:18 GMT',
                    'x-axios-cache-stale-if-error': `${TTL}`,
                  },
                },
              });
            },
            function error(e) {
              console.log({ error: e });
            }
          );
        }
      });
    });
  };

  return (
    <>
      <hr />
      <input type="file" onChange={onChange} name="file" className="file" accept=".zip" />
      <br />
      <button onClick={loadToLS}>Load</button> <br />
    </>
  );
}

export default UploadResources;
