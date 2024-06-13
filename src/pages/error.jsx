import { Block, BlockTitle, Navbar, NavbarBackLink } from 'konsta/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BaseLayout from '../components/BaseLayout';

// TODO added button for removing all settings
export default function Settings() {
  const { t } = useTranslation();
  localStorage.setItem('language', '');
  return (
    <BaseLayout>
      <Navbar
        title={t('Error')}
        titleFontSizeMaterial="17"
        titleClassName="truncate !static !-translate-x-0 !-translate-y-0"
        className="top-0 sticky border-b border-figma-border-light dark:border-figma-border-dark"
        colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}
        innerClassName="my-0 mx-auto max-w-4xl"
        left={<NavbarBackLink component={RouterLink} text={t('Back')} to={'/'} />}
      />
      <div className="mt-5 mx-auto max-w-4xl">
        <BlockTitle>
          <h1>{t('ErrorTitle')}</h1>
        </BlockTitle>
        <Block>
          <p>{t('ErrorMessage')}</p>
        </Block>
      </div>
    </BaseLayout>
  );
}
