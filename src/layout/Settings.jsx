import { App, Navbar, NavbarBackLink, Page } from 'konsta/react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { darkModeState, titleState } from '../atoms';
import { useRecoilValue } from 'recoil';
import { getTheme } from '../helper';

export default function Settings() {
  const { t } = useTranslation();
  const title = useRecoilValue(titleState);
  const darkMode = useRecoilValue(darkModeState);
  return (
    <App theme={getTheme()} safeAreas className={darkMode === '1' ? 'dark theme-dark' : ''}>
      <Page colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}>
        <Navbar
          title={title && t(title)}
          className="top-0 sticky border-b border-figma-border-light dark:border-figma-border-dark"
          colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}
          titleFontSizeMaterial="17"
          titleClassName="truncate !static !-translate-x-0 !-translate-y-0"
          innerClassName="my-0 mx-auto max-w-4xl"
          left={<NavbarBackLink text={t('Back')} showText={false} onClick={() => history.back()} />}
          right={<></>}
        />
        <Outlet />
      </Page>
    </App>
  );
}
