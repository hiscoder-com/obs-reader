import { App, Icon, Link, Navbar, Page } from 'konsta/react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subtitleState } from '../atoms';
import { useState } from 'react';
import { getTheme } from '../helper';
import LeftMenu from '../components/LeftMenu';
import { useTranslation } from 'react-i18next';
import { MdMenu, MdSettings } from 'react-icons/md';
import { GearAlt, Menu } from 'framework7-icons/react';

export default function Story() {
  const subtitle = useRecoilValue(subtitleState);
  const { t } = useTranslation();
  const [leftPanelOpened, setLeftPanelOpened] = useState(false);
  return (
    <App theme={getTheme()}>
      <Page>
        <Navbar
          title={t('OpenBibleStories')}
          subtitle={subtitle}
          titleFontSizeMaterial="17"
          titleClassName="truncate !static !transform-none"
          subtitleClassName="truncate"
          className="top-0 sticky"
          innerClassName="my-0 mx-auto max-w-4xl"
          left={
            <Link navbar onClick={() => setLeftPanelOpened(true)}>
              <Icon ios={<Menu className="w-7 h-7" />} material={<MdMenu className="w-6 h-6" />} />
            </Link>
          }
          right={
            <Link navbar component={RouterLink} to={'/settings'}>
              <Icon ios={<GearAlt className="w-7 h-7" />} material={<MdSettings className="w-6 h-6" />} />
            </Link>
          }
        />
        <LeftMenu
          leftPanelOpened={leftPanelOpened}
          setLeftPanelOpened={setLeftPanelOpened}
        />
        <Outlet />
      </Page>
    </App>
  );
}
