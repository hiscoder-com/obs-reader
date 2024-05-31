import { App, Navbar, NavbarBackLink, Page } from 'konsta/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { titleState } from '../atoms';
import { useRecoilValue } from 'recoil';
import { getTheme } from '../helper';

export default function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const history = useLocation();
  const title = useRecoilValue(titleState);
  return (
    <App theme={getTheme()}>
      <Page>
        <Navbar
          title={title && t(title)}
          className="top-0 sticky"
          innerClassName="my-0 mx-auto max-w-4xl"
          left={
            history.pathname !== '/' ? (
              <NavbarBackLink text={t('Back')} onClick={() => navigate('/')} />
            ) : (
              <></>
            )
          }
        />
        <Outlet />
      </Page>
    </App>
  );
}
