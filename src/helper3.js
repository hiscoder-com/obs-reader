import Axios from 'axios';
import {
  setupCache,
  buildStorage,
} from 'axios-cache-interceptor';
import localforage from 'localforage';

const lfStorage = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'lf-cache',
});

const localForage = buildStorage({
  find: (key, currentRequest) => {
    console.log({key, find: currentRequest });
    return lfStorage.getItem(key)
  },
  set: (key, value, currentRequest) => {
    console.log({key, set: currentRequest });
    return lfStorage.setItem(key, value)
  },
  remove: (key, currentRequest) => {
    console.log({key, remove: currentRequest });
    return lfStorage.removeItem(key)
  },
});

const axios = setupCache(Axios, {
  debug: console.log,
  storage: localForage,
  cacheTakeover: false,
  ttl: 1000 * 60 * 60 * 31,
});

export default axios;
