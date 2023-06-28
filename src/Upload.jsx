import JSZip from 'jszip';
import { useState } from 'react';
import { TTL, storage } from './helper';

function UploadResources() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [file, setFile] = useState();

  const onChange = (evt) => {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      setFile(reader.result);
    };
    reader.readAsArrayBuffer(file);
  };

  const loadToLS = () => {
    if (!file || !repo || !owner) {
      return false;
    }
    const zip = new JSZip();
    zip.loadAsync(file).then(function (zip) {
      zip.forEach(function (relativePath, zipEntry) {
        if (
          !zipEntry.dir &&
          ['md'].includes(zipEntry.name.substring(zipEntry.name.length - 2))
        ) {
          console.log({ name: zipEntry.name });
          const file = zipEntry.name;
          zipEntry.async('string').then(
            function success(content) {
              storage.setItem(
                'get+https://git.door43.org/' +
                  owner +
                  '/' +
                  repo +
                  '/raw/branch/master/content/' +
                  file,
                {
                  expires: Date.now() + TTL,
                  state: 'cached',
                  ttl: TTL,
                  createdAt: Date.now(),
                  data: {
                    data: content,
                    status: 200,
                    statusText: 'OK',
                    headers: {
                      'cache-control':
                        'private, max-age=' + TTL,
                      'content-disposition':
                        'inline; filename="' +
                        file +
                        "\"; filename*=UTF-8''" +
                        file,
                      'content-type': 'text/plain; charset=utf-8',
                      'last-modified': 'Thu, 06 May 2021 09:48:18 GMT',
                      'x-axios-cache-stale-if-error': `${
                        TTL
                      }`,
                    },
                  },
                }
              );
            },
            function error(e) {
              console.log({ error: e });
            }
          );
        }
      });
    });
  };

  const clearCache = () => {
    storage
      .keys()
      .then(function (keys) {
        keys.forEach((el) => {
          storage.removeItem(el);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <hr />
      <input
        type="file"
        onChange={onChange}
        name="file"
        className="file"
        accept=".zip"
      />
      <br />
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />{' '}
      <br />
      <button onClick={loadToLS}>Load</button> <br />
      <button style={{ background: '#f335' }} onClick={clearCache}>
        Clear Cache!
      </button>
    </>
  );
}

export default UploadResources;
