import { App, Block, BlockTitle, Navbar, NavbarBackLink, Page } from 'konsta/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTheme } from '../helper';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <App theme={getTheme()}>
      <Page>
        <Navbar
          title={t('Error')}
          className="top-0 sticky"
          left={<NavbarBackLink component={RouterLink} text={t('Back')} to={'/'} />}
        />
        <BlockTitle>
          <h1>{t('ErrorTitle')}</h1>
        </BlockTitle>
        <Block>
          <p>{t('ErrorMessage')}</p>
        </Block>
      </Page>
    </App>
  );
}
