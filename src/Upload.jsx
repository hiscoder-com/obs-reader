import localforage from 'localforage';
import JSZip from 'jszip';

const cacheStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});

function UploadResources() {
  const onChange = (evt) => {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      const zip = new JSZip();
      zip.loadAsync(reader.result).then(function (zip) {
        zip.forEach(function (relativePath, zipEntry) {
          if (
            !zipEntry.dir &&
            ['md'].includes(zipEntry.name.substring(zipEntry.name.length - 2))
          ) {
            console.log({ name: zipEntry.name });
            const file = zipEntry.name;
            zipEntry.async('string').then(
              function success(content) {
                cacheStore.setItem(
                  'get+https://git.door43.org/ru_gl/ru_obs/raw/branch/master/content/' +
                    file,
                  {
                    expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
                    state: 'cached',
                    ttl: 300000,
                    createdAt: Date.now(),
                    data: {
                      data: content,
                      status: 200,
                      statusText: 'OK',
                      headers: {
                        'cache-control': 'private, max-age=300',
                        'content-disposition':
                          'inline; filename="' +
                          file +
                          "\"; filename*=UTF-8''" +
                          file,
                        'content-type': 'text/plain; charset=utf-8',
                        'last-modified': 'Thu, 06 May 2021 09:48:18 GMT',
                        'x-axios-cache-stale-if-error': '300000',
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
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input
        type="file"
        onChange={onChange}
        name="file"
        className="file"
        accept=".zip"
      />
      <button
        style={{ background: '#f335' }}
        onClick={() => {
          cacheStore
            .keys()
            .then(function (keys) {
              keys.forEach((el) => {
                cacheStore.removeItem(el);
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        }}>
        Clear Cache!
      </button>
    </>
  );
}

export default UploadResources;
