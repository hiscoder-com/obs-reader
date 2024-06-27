import { US as EN, RU, KZ as KK, IN as HI, UZ, UA as UK, SS } from 'country-flag-icons/react/3x2';
export const countries = { en: EN, ru: RU, kk: KK, hi: HI, uz: UZ, uk: UK, apd: SS };

export const languagesApp = [
  'en',
  'ru',
  'apd'
]

export const langList = {
  ru: 'ru_gl/ru_obs/raw/branch/master/content/',
  en: 'unfoldingWord/en_obs/raw/branch/master/content/',
  kk: 'kk_gt_final/kk_obs/raw/branch/master/',
  hi: 'Door43-Catalog/hi_obs/raw/branch/master/content/',
  // zh: 'ZH/zh_obs/raw/branch/master/content/',
  // xsu: 'Es-419_gl/xsu_obs/raw/branch/master/content/',
  // 'es-419': 'Door43-Catalog/es-419_obs/raw/branch/master/content/',
  // rml: 'rm_ol/rml_obs/raw/branch/master/content/',
  // fa: 'fa_gl/fa_obs/raw/branch/master/content/',
  uz: 'uz_gt_final/uz_obs/raw/branch/master/',
  uk: 'uk_gt/uk_obs/raw/branch/master/content/',
  apd: 'GRA/apd_obs/raw/branch/master/content/',
  // 'ur-deva': 'Door43-Catalog/ur-deva_obs/raw/branch/master/content/',
  // te: 'Door43-Catalog/te_obs/raw/branch/master/content/',
  // ta: 'Door43-Catalog/ta_obs/raw/branch/master/content/',
  // sw: 'Door43-Catalog/sw_obs/raw/branch/master/content/',
  // 'rmr-x-bsl': 'Door43-Catalog/rmr-x-bsl_obs/raw/branch/master/content/',
  // pa: 'Door43-Catalog/pa_obs/raw/branch/master/content/',
  // or: 'Door43-Catalog/or_obs/raw/branch/master/content/',
};

export const languages = Object.keys(langList);

export const fontList = {
  default: '',
  FiraSans: '"Fira Sans", sans-serif',
  Literata: '"Literata", sans-serif',
  RobotoFlex: '"Roboto Flex", sans-serif',
  SourceSerif: '"Source Serif 4", serif',
};
