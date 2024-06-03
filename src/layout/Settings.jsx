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
    <App theme={getTheme()} className={darkMode === '1' ? 'dark theme-dark' : ''}>
      <Page>
        <Navbar
          title={title && t(title)}
          className="top-0 sticky"
          innerClassName="my-0 mx-auto max-w-4xl"
          left={<NavbarBackLink text={t('Back')} onClick={() => history.back()} />}
        />
        <Outlet />
      </Page>
    </App>
  );
}
