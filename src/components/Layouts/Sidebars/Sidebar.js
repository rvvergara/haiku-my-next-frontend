
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerNavLinks from './PractitionerNavLinks';
import PatientNavLinks from './PatientNavLinks';

export const Sidebar = ({ currentUser }) => {
  console.log(currentUser);
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
        {currentUser.data.role === 'practitioner' ? <PractitionerNavLinks /> : <PatientNavLinks />}
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
