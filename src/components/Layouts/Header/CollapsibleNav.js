import Router from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FiLogOut } from 'react-icons/fi';
import { connect } from 'react-redux';
import { i18n, withTranslation } from '../../../../i18n';
import { logout } from '../../../store/thunks/user';
import { setLanguage } from '../../../store/actions/language';
import PatientNavLinks from './PatientNavLinks';
import PractitionerNavLinks from './PractitionerNavLinks';
import localLanguanges from '../../../utils/languange';

export const CollapsibleNav = ({
 currentUserData, logout, t, localLang, setLanguage,
}) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  const [local, setLocal] = useState(localLanguanges[localLang]);


  useEffect(() => {
    setLocal(localLang);
  }, [localLang]);

  const handleChange = (e) => {
    setLocal(e.target.value);
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const { role } = currentUserData;
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="logged-header-collapsible-nav"
      >
        <Nav className="ml-auto header-nav">
          <div className="user-menu">
            {role === 'PRACTITIONER' ? (
              <PractitionerNavLinks />
            ) : (
              <PatientNavLinks />
            )}
          </div>
          <select onChange={handleChange} value={local}>
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>

          <Nav.Link
            type="button"
            className="theme-button inverse-theme-button"
            onClick={handleLogout}
          >
            <FiLogOut className="nav-icons logout-icon" />
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

CollapsibleNav.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
};

CollapsibleNav.getInitialProps = async () => ({
  namespacesRequired: ['common', 'footer'],
});

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  localLang: state.language,
});

export default connect(mapStateToProps, { logout, setLanguage })(
  withTranslation('common')(CollapsibleNav),
);
