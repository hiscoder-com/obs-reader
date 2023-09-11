import { atom } from 'recoil';

let defaultFont = 'default';
if (!localStorage.getItem('font')) {
  localStorage.setItem('font', defaultFont);
} else {
  defaultFont = localStorage.getItem('font');
}

export const fontState = atom({
  key: 'fontState',
  default: defaultFont,
});

let defaultLanguage = 'ru';
if (!localStorage.getItem('language')) {
  localStorage.setItem('language', defaultLanguage);
} else {
  defaultLanguage = localStorage.getItem('language');
}

export const languageState = atom({
  key: 'languageState',
  default: defaultLanguage,
});

export const subtitleState = atom({
  key: 'subtitleState',
  default: '',
});

export const titleState = atom({
  key: 'titleState',
  default: '',
});

let defaultShowImages = '1';
if (!localStorage.getItem('showImages')) {
  localStorage.setItem('showImages', defaultShowImages);
} else {
  defaultShowImages = localStorage.getItem('showImages');
}

export const showImagesState = atom({
  key: 'showImagesState',
  default: defaultShowImages,
});

let defaultFontSize = 16;
if (!localStorage.getItem('fontSize')) {
  localStorage.setItem('fontSize', defaultFontSize);
} else {
  defaultFontSize = localStorage.getItem('fontSize');
}

export const fontSizeState = atom({
  key: 'fontSizeState',
  default: defaultFontSize,
});

let defaultStory = 0;
if (!localStorage.getItem('story')) {
  localStorage.setItem('story', defaultStory);
} else {
  defaultStory = localStorage.getItem('story');
}

export const storyState = atom({
  key: 'storyState',
  default: defaultStory,
});
