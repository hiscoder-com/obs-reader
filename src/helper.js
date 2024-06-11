import Axios from 'axios';
import { setupCache, buildStorage } from 'axios-cache-interceptor';
import JSZip from 'jszip';
import localforage from 'localforage';
import { langList } from './constants';

export const TTL = 1000 * 60 * 60 * 24 * 365;

export const storage = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});

export const langStorage = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'local-lang-cache',
});

const localForage = buildStorage({
  find: (key) => {
    return storage.getItem(key);
  },
  set: (key, value) => {
    return storage.setItem(key, value);
  },
  remove: (key) => {
    return storage.removeItem(key);
  },
});

export const axios = setupCache(Axios, {
  storage: localForage,
  cacheTakeover: false,
  ttl: TTL,
  generateKey: (request) => request.method + '+' + request.url,
});

export const getTheme = () => {
  const uA = navigator.userAgent || navigator.vendor || window.opera;
  if ((/iPad|iPhone|iPod/.test(uA) && !window.MSStream) || uA.includes('Mac')) {
    return 'ios';
  }
  return 'material';
};

const saveToCache = async (baseUrl, fileName, content) => {
  await storage.setItem(baseUrl + fileName, {
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
          'inline; filename="' + fileName + "\"; filename*=UTF-8''" + fileName,
        'content-type': 'text/plain; charset=utf-8',
        'last-modified': 'Thu, 06 May 2021 09:48:18 GMT',
        'x-axios-cache-stale-if-error': `${TTL}`,
      },
    },
  });
};
const getCorrectNamesFromZip = async (files, language, domain) => {
  const toc = [];
  for (const file in files) {
    if (Object.hasOwnProperty.call(files, file)) {
      const fileData = files[file];
      if (fileData.dir || fileData.name.substring(fileData.name.length - 3) !== '.md')
        continue;
      const fileName = fileData.name.split('/').pop();
      if (isNaN(parseInt(fileName))) continue;
      try {
        const content = await fileData.async('string');
        toc.push({ file: fileName.split('.')[0], title: content.split('\n')[0].split('#')[1].trim() });
        await saveToCache(
          'get+' + domain + (langList[language] ?? language+'/'),
          fileName,
          content
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  await saveToCache(
    'get+' + domain + (langList[language] ?? language+'/'),
    'toc.json',
    JSON.stringify(toc)
  );
};

export const loadToCache = async (zipFile, language, domain = 'https://git.door43.org/') => {
  const zip = new JSZip();
  const zipRes = await zip.loadAsync(zipFile);
  await getCorrectNamesFromZip(zipRes.files, language, domain);
};
