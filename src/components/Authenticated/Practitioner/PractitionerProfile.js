import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setPractitioner } from '../../../store/actions/practitioners';
import Booking from '../Booking/Booking';
import PractitionerCard from './PractitionerCard';
import PractitionerDetailsCard from './PractitionerDetailsCard';

const PractitionerProfile = ({ setPractitioner, role }) => {
  useEffect(() => () => setPractitioner({}));
  return (
    <div className="profile">
      <div>
        <PractitionerCard />
        <PractitionerDetailsCard />
      </div>

      {role === 'patient' && <Booking />}
    </div>
  );
};

PractitionerProfile.propTypes = {
  setPractitioner: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.currentUser.data.role,
});

export default connect(mapStateToProps, { setPractitioner })(
  PractitionerProfile,
);
