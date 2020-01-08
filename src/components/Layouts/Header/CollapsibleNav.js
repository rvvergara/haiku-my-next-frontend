import Router from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FiLogOut } from 'react-icons/fi';
import { connect } from 'react-redux';
import { i18n, withTranslation } from '../../../../i18n';
import { logout } from '../../../store/thunks/user';
import PatientNavLinks from './PatientNavLinks';
import PractitionerNavLinks from './PractitionerNavLinks';
import {getCookie} from '../../../utils/cookie'
import localLanguanges from '../../../utils/languange'

export const CollapsibleNav = ({ currentUserData, logout, t }) => {
  const handleLogout = () => {
    logout();
    Router.push('/');
  };

  const [language, setLanguage] = useState(localLanguanges[getCookie('next-i18next')]);

  const handleChange = e => {
    setLanguange(e.target.value);
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
          {/* {
            (currentUserData.patient || currentUserData.practitioner) && (
            <div className="header__links__welcome">
              <strong className="logged-header-greeting">
              Welcome
                {' '}
                {
                role === 'PRACTITIONER'
                 ? 'Dr. '
                 : ''
              }
                {role === 'PRACTITIONER' ? currentUserData.practitioner.firstName : currentUserData.patient.firstName}
              </strong>
            </div>
            )
          } */}
          <button
            type="button"
            onClick={() =>
              i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')
            }
          >
            {t('change-locale')}
          </button>

          <select onChange={e => handleChange(e)} value={languange}>
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

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, { logout })(
  withTranslation('common')(CollapsibleNav),
);
