import PropTypes from 'prop-types';
import React from 'react';
import { i18n, Link, withTranslation } from '../../i18n';
// import Footer from '../components/Footer';
// import Header from '../components/Header';

const Homepage = ({ t }) => (
  <div>
    <main>
      <div title={t('h1')}></div>
      <div>
        <button
          type="button"
          onClick={() =>
            i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')
          }
        >
          {t('change-locale')}
        </button>
        <Link href="/second-page">
          <button type="button">{t('to-second-page')}</button>
        </Link>
      </div>
    </main>
    <div></div>
  </div>
);

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'footer'],
});

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Homepage);
