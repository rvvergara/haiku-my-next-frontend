import Head from 'next/head';
import PropTypes from 'prop-types';
import ConnectedHeader from './Header';
import Sidebar from './Sidebars/Sidebar';

const Layout = ({ children, title }) => (
  <div className="authenticated-layout">
    <Head>
      <title>
        Igaku |
        {' '}
        {title}
      </title>
    </Head>
    <ConnectedHeader />
    <div className="authenticated-body">
      <Sidebar />
      <div className="authenticated-body__content">
        { children }
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
