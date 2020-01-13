import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { i18n, withTranslation } from '../../../i18n';
import { setLanguage } from '../../store/actions/language';
import LoginHeader from './LoginHeader';

const VisitorHeader = ({ t, localLang, setLanguage }) => {
  const [local, setLocal] = useState(localLang);

  useEffect(() => {
    if (!localLang) {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    setLocal(localLang);
  }, [localLang]);

  const handleChange = (e) => {
    setLocal(e.target.value);
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  return (
    <header>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="/">
          <img
            src="./static/igaku_social_logo_text.png"
            className="header-logo-small"
            alt="Igaku Logo"
          />

          <img
            src="./static/igaku_logo_side_by_side.png"
            className="header-logo-text"
            alt="Igaku Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <select onChange={handleChange} value={local || 'en'}>
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
            <LoginHeader />
            {/* <Link href="/login">
              <Nav.Link
                className="theme-button"
                onClick={() => localStorage.clear()}
                href="/login"
              >
                {t('login')}
              </Nav.Link>
            </Link>
            <Link href="/signup">
              <Nav.Link
                className="theme-button"
                type="button"
                href="/signup"
                onClick={() => localStorage.clear()}
              >
                {t('signup')}
              </Nav.Link>
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

VisitorHeader.propTypes = {
  t: PropTypes.func.isRequired,
  localLang: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  localLang: state.language,
});

export default connect(mapStateToProps, { setLanguage })(
  withTranslation('visitorHeader')(VisitorHeader),
);
