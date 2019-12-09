
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userConstants } from '../../../store/constants/userConstants';
import PractitionerNavLinks from './PractitionerNavLinks';
import PatientNavLinks from './PatientNavLinks';
import AdminNavLinks from './AdminNavLinks';

const renderSideBar = (userRole) => {
  switch (userRole) {
    case userConstants.PRACTITIONER_ROLE:
      return <PractitionerNavLinks />;
    case userConstants.PATIENT_ROLE:
      return <PatientNavLinks />;
    case userConstants.ADMIN_ROLE:
      return <AdminNavLinks />;
    default:
      return null;
  }
};

export const Sidebar = ({ currentUser }) => {
  const defaultImg = currentUser.data.role === 'practitioner' ? 'http://tinyimg.io/i/qWwgVO4.jpg' : 'https://tinyimg.io/i/BmtLUPZ.jpg';
  const imgSrc = currentUser.data.profile && currentUser.data.profile.image ? currentUser.data.profile.image : defaultImg;
  return (
    <div className="authenticated-body__sidebar">
      <div className="authenticated-body__sidebar-container">
        <div className="profile-avatar">
          <img
            src={imgSrc}
            alt="Patient Profile"
            className="profile-avatar__img"
          />
        </div>
        { renderSideBar(currentUser.data.role) }
      </div>
    </div>
);
  };


Sidebar.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(Sidebar);
