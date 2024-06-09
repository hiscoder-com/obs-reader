import { Navbar, NavbarBackLink } from 'konsta/react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { titleState } from '../atoms';
import { useRecoilValue } from 'recoil';
import BaseLayout from '../components/BaseLayout';

export default function Settings() {
  const { t } = useTranslation();
  const title = useRecoilValue(titleState);
  return (
    <BaseLayout>
      <Navbar
        title={title && t(title)}
        titleFontSizeMaterial="17"
        titleClassName="truncate !static !-translate-x-0 !-translate-y-0"
        className="top-0 sticky border-b border-figma-border-light dark:border-figma-border-dark"
        colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}
        innerClassName="my-0 mx-auto max-w-4xl"
        left={<NavbarBackLink text={t('Back')} showText={false} onClick={() => history.back()} />}
        right={<></>}
      />
      <Outlet />
    </BaseLayout>
  );
}
