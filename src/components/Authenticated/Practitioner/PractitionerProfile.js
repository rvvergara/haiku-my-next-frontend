import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPractitioner } from '../../../store/actions/practitioners';
import PractitionerCard from './PractitionerCard';
import PractitionerDetailsCard from './PractitionerDetailsCard';
import Booking from '../Booking/Booking';

const PractitionerProfile = ({ setPractitioner }) => {
  useEffect(() => () => setPractitioner({}));
  return (
    <div className="profile">
      <div>
        <PractitionerCard />
        <PractitionerDetailsCard />
      </div>

      <Booking />
    </div>
);
};

PractitionerProfile.propTypes = {
  setPractitioner: PropTypes.func.isRequired,
};

export default connect(null, { setPractitioner })(PractitionerProfile);
