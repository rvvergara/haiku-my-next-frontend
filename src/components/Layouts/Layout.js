import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebars/Sidebar';

const Layout = ({ children, title }) => (
  <div className="root">
    <Head>
      <title>
        Igaku |
        {' '}
        {title}
      </title>
    </Head>
    <Header />
    <Sidebar />
    <div className="main-content">
      { children }
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
