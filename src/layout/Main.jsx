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
          titleFontSizeMaterial="17"
          titleClassName="truncate !static !-translate-x-0 !-translate-y-0"
          className="top-0 sticky"
          innerClassName="my-0 mx-auto max-w-4xl"
          left={
            history.pathname !== '/' ? (
              <NavbarBackLink showText={false} onClick={() => navigate('/')} />
            ) : (
              <></>
            )
          }
          right={
            <></>
          }
        />
        <Outlet />
      </Page>
    </App>
  );
}
