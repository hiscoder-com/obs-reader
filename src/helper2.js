import localforage from 'localforage';
import { setup } from 'axios-cache-adapter';
import {TTL, storage} from './helper'

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
  store: storage,
  maxAge: TTL,
  debug: true,
  clearOnStale: false,
  clearOnError: false,
  exclude: {
    query: false,
    methods: ['put', 'patch', 'delete'],
  },
  key: (req) => {
    return req.method + '+' + req.url;
  },
};

const axios = setup({cache: options})

export default axios;
