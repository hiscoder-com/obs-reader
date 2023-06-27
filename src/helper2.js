import localforage from 'localforage';
import { setup } from 'axios-cache-adapter';

const cacheStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});

localforage
  .ready()
  .then(function () {
    console.log(localforage.driver()); // LocalStorage
  })
  .catch(function (e) {
    console.log(e); // `No available storage method found.`
    // One of the cases that `ready()` rejects,
    // is when no usable storage driver is found
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
