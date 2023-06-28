import Axios from 'axios';
import {
  setupCache,
  buildStorage,
} from 'axios-cache-interceptor';
import localforage from 'localforage';

export const TTL = 1000 * 60 * 60 * 31;

export const storage = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});

const localForage = buildStorage({
  find: (key, currentRequest) => {
    console.log({key, find: currentRequest });
    return storage.getItem(key)
  },
  set: (key, value, currentRequest) => {
    console.log({key, set: currentRequest });
    return storage.setItem(key, value)
  },
  remove: (key, currentRequest) => {
    console.log({key, remove: currentRequest });
    return storage.removeItem(key)
  },
});

const axios = setupCache(Axios, {
  debug: console.log,
  storage: localForage,
  cacheTakeover: false,
  ttl: TTL,
  generateKey: (request) => request.method + '+' + request.url,
});

export default axios;
