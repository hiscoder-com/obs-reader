import { Block, BlockTitle, Navbar, NavbarBackLink } from 'konsta/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BaseLayout from '../components/BaseLayout';

// TODO добавить кнопку, по нажатию на которую будет сбрасываться весь кеш приложения, все материалы и все настройки
export default function Settings() {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <Navbar
        title={t('Error')}
        className="top-0 sticky"
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
