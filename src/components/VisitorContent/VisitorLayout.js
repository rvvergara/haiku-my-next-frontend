import Head from 'next/head';
import PropTypes from 'prop-types';

const VisitorLayout = ({ children, title }) => (
  <div className="visitor-layout">
    <Head>
      <title>
        Igaku |
        {' '}
        {title}
      </title>
    </Head>
    { children }
  </div>
);

VisitorLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default VisitorLayout;
