
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerNavLinks from './PractitionerNavLinks';
import PatienNavLinks from './PatientNavLinks';

export const Sidebar = ({ userRole }) => {
  const imgSrc = userRole === 'practitioner' ? 'http://tinyimg.io/i/qWwgVO4.jpg' : 'https://tinyimg.io/i/BmtLUPZ.jpg';
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
        {userRole === 'practitioner' ? <PractitionerNavLinks /> : <PatienNavLinks />}
      </div>
    </div>
);
};

Sidebar.propTypes = {
  userRole: PropTypes.string,
};

Sidebar.defaultProps = {
  userRole: '',
};

const mapStateToProps = (state) => ({
  userRole: state.currentUser.data.role,
});

export default connect(mapStateToProps)(Sidebar);
