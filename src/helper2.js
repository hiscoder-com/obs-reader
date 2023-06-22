import localforage from 'localforage';
import { setup } from 'axios-cache-adapter';

const cacheStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});

const options = {
  store: cacheStore,
  maxAge: 15 * 60 * 1000, // 15-minutes
  debug: true,
  clearOnStale: false,
  clearOnError: false,
  exclude: {
    query: false,
    methods: ['put', 'patch', 'delete'],
  },
  key: (req) => {
    console.log({ method: req.method });
    return req.method + '+' + req.url;
  },
};

const axios = setup({cache: options})

export default axios;
