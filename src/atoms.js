import { atom } from 'recoil';

const localStorageEffect = (key) => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(savedValue);
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, newValue);
  });
};

export const fontState = atom({
  key: 'fontState',
  default: 'default',
  effects: [localStorageEffect('font')],
});

export const languageState = atom({
  key: 'languageState',
  default: '',
  effects: [localStorageEffect('language')],
});

export const languageAppState = atom({
  key: 'languageAppState',
  default: 'en',
  effects: [localStorageEffect('languageApp')],
});

export const subtitleState = atom({
  key: 'subtitleState',
  default: '',
});

export const titleState = atom({
  key: 'titleState',
  default: '',
});

export const showImagesState = atom({
  key: 'showImagesState',
  default: '1',
  effects: [localStorageEffect('showImages')],
});

export const fontSizeState = atom({
  key: 'fontSizeState',
  default: 16,
  effects: [localStorageEffect('fontSize')],
});

export const storyState = atom({
  key: 'storyState',
  default: '01',
  effects: [localStorageEffect('story')],
});

export const darkModeState = atom({
  key: 'darkModeState',
  default: '0',
  effects: [localStorageEffect('darkMode')],
});

export const isRtlState = atom({
  key: 'isRtlState',
  default: '0',
  effects: [localStorageEffect('isRtl')]
});
