import {
  US as EN,
  RU,
  KZ as KK,
  IN as HI,
  UZ,
  UA as UK,
  SD as SS,
  AZ,
  VE,
  IR,
  PK,
  ES,
  TM,
  TJ,
  YE,
  BR,
  BY,
  SA,
} from 'country-flag-icons/react/3x2';

export const countries = {
  en: EN,
  ru: RU,
  kk: KK,
  hi: HI,
  uz: UZ,
  uk: UK,
  apd: SS,
  kib: SS,
  fvr: SS,
  tbi: SS,
  kgo: SS,
  mdg: SS,
  liu: SS,
  acz: SS,
  shj: SS,
  az: AZ,
  pid: VE,
  kn: HI,
  srz: IR,
  bal: PK,
  tly: AZ,
  'es-419': ES,
  xsu: VE,
  haz: IR,
  tk: TM,
  tks: IR,
  smy: IR,
  qxq: IR,
  mzn: IR,
  lrc: IR,
  glk: IR,
  def: IR,
  ckb: IR,
  bqi: IR,
  sgh: TJ,
  azb: AZ,
  lki: IR,
  'ar-xzn': IR,
  ayn: YE,
  acq: YE,
  pak: BR,
  rml: BY,
  bcc: IR,
  'ar-x-dcv': SA,
  ar: SA,
  fa: IR,
};



export const languagesApp = ['en', 'ru', 'ar', "fa"];

export const rtlLanguages = ['apd', 'srz', 'bal', 'tly', 'haz', 'tk', 'tks', 'smy', 'qxq', 'mzn', 'lrc', 'glk', 'def', 'ckb', 'bqi', 'lki', 'ar-xzn', 'bcc', 'ar-x-dcv', 'ar', 'fa'];

export const langList = {
  en: 'unfoldingWord/en_obs/raw/branch/master/content/',
  hi: 'Door43-Catalog/hi_obs/raw/branch/master/content/',
  ru: 'ru_gl/ru_obs/raw/branch/master/content/',
  //kk: 'kk_gt_final/kk_obs/raw/branch/master/', error 5, 19, 39
  uz: 'uz_gt_final/uz_obs/raw/branch/master/',
  uk: 'uk_gt/uk_obs/raw/branch/master/content/',
  apd: 'GRA/apd_obs/raw/branch/master/content/',
  kib: 'Nhial/kib_obs_text_obs/raw/branch/master/',
  fvr: 'Nhial/fvr_obs_text_obs/raw/branch/master/',
  tbi: 'Nhial/tbi_obs_text_obs/raw/branch/master/',
  kgo: 'Nhial/kgo_obs_text_obs/raw/branch/master/',
  mdg: 'Nhial/mdg_obs_text_obs/raw/branch/master/',
  liu: 'Nhial/liu_obs_text_obs/raw/branch/master/',
  acz: 'Nhial/acz_obs_text_obs/raw/branch/master/',
  shj: 'Nhial/shj_obs_text_obs/raw/branch/master/',
  az: 'az_gt_final/az_obs/raw/branch/master/',
  pid: 'adipatealberto/pid_obs_text_obs/raw/branch/master/',
  kn: 'Door43-Catalog/kn_obs/raw/branch/master/content/',
  srz: 'Sitorabi/srz_obs_text_obs/raw/branch/master/',
  bal: 'fa_gl/Balochi_OBS/raw/branch/master/',
  tly: 'fa_gl/Talishi_OBS/raw/branch/master/',
  'es-419': 'Door43-Catalog/es-419_obs/raw/branch/master/content/',
  xsu: 'es-419_gl/xsu_obs/raw/branch/master/',
  haz: 'fa_gl/Hazaragi_OBS/raw/branch/master/',
  tk: 'Sitorabi/tk_obs_text_obs/raw/branch/master/',
  tks: 'fa_gl/Tati_OBS/raw/branch/master/',
  smy: 'fa_gl/Semnani_OBS/raw/branch/master/',
  qxq: 'fa_gl/Qashqai_OBS/raw/branch/master/',
  mzn: 'fa_gl/Mazandarani_OBS/raw/branch/master/',
  lrc: 'fa_gl/Luri_OBS/raw/branch/master/',
  glk: 'fa_gl/Gilaki_OBS/raw/branch/master/',
  def: 'fa_gl/Dezfuli_OBS/raw/branch/master/',
  ckb: 'fa_gl/Sorani_OBS/raw/branch/master/',
  bqi: 'fa_gl/Bakhtyari_OBS/raw/branch/master/',
  sgh: 'sgh_ol/sgh_obs/raw/branch/master/',
  //azb: "fa_gl/Azari_OBS/raw/branch/master/", error
  lki: 'fa_gl/Laki_OBS/raw/branch/master/',
  'ar-xzn': 'fa_gl/Khuzestani-Arabic_OBS/raw/branch/master/',
  // ayn: "ayn_ol/ayn_obs/raw/branch/master/content/", big size
  // acq: "acq_ol/acq_obs/raw/branch/master/content/", big size
  pak: 'AURISTEA/pak_obs_julho22/raw/branch/master/content/',
  rml: 'rm_ol/rml_obs/raw/branch/master/content/',
  bcc: 'Sitorabi/bcc_obs_text_obs/raw/branch/master/',
  'ar-x-dcv': 'Sitorabi/ar-x-dcv_obs_text_obs/raw/branch/master/',
};

export const languages = Object.keys(langList);

export const fontList = {
  default: '',
  FiraSans: '"Fira Sans", sans-serif',
  Literata: '"Literata", sans-serif',
  RobotoFlex: '"Roboto Flex", sans-serif',
  SourceSerif: '"Source Serif 4", serif',
};
