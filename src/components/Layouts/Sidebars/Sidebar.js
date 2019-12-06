
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerNavLinks from './PractitionerNavLinks';
import PatienNavLinks from './PatientNavLinks';

export const Sidebar = ({ userRole }) => (
  <div className="authenticated-body__sidebar">
    <div className="authenticated-body__sidebar-container">
      {userRole === 'practitioner' ? <PractitionerNavLinks /> : <PatienNavLinks />}
    </div>
  </div>
);

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
