import axios from 'axios';
// import { setupCache, buildWebStorage } from 'axios-cache-interceptor';
// import localforage from 'localforage';

// const lfStorage = localforage.createInstance({
//   driver: [localforage.INDEXEDDB],
//   name: 'lf-cache',
// });

// const axios = setupCache(Axios, {
//   debug: console.log,
//   storage: buildWebStorage(localStorage, 'axios-cache:'),
//   headerInterpreter: () => 'not enough headers',
// });

export default axios;
