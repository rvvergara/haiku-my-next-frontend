import Head from 'next/head';
import PropTypes from 'prop-types';
import Alert from './Alert';
import ConnectedHeader from './Header';
import ConnectedSidebar from './Sidebars/Sidebar';

const Layout = ({ children, title }) => (
  <div className="authenticated-layout">
    <Head>
      <title>
Igaku |
        {title}
      </title>
    </Head>
    <ConnectedHeader />
    <div className="authenticated-body">
      <ConnectedSidebar />
      <Alert />
      <div className="authenticated-body__content">{children}</div>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
