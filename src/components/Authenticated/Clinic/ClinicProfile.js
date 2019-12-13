import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PractitionerList from '../Practitioner/PractitionerList';
import { setClinic } from '../../../store/actions/clinic';

const ClinicProfile = ({ setClinic, clinic }) => {
  const { name, address, postalCode } = clinic;

  useEffect(() => () => {
      setClinic({});
    }, []);
  return (
    <div className="clinic-profile">
      <h1>{name}</h1>
      <p>{address}</p>
      <p>{postalCode}</p>

      <ul className="clinic-opening-hours">
        <li>Thursday 9AM–6PM</li>
        <li>Friday 9AM–6PM</li>
        <li>Saturday 9AM–1PM</li>
        <li>Sunday Closed</li>
        <li>Monday 9AM–6PM</li>
        <li>Tuesday 9AM–6PM</li>
        <li>Wednesday 9AM–6PM</li>
      </ul>

      <PractitionerList />
    </div>
  );
};

ClinicProfile.propTypes = {
  clinic: PropTypes.instanceOf(Object).isRequired,
  setClinic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clinic: state.displayedClinic,
});

export default connect(mapStateToProps, { setClinic })(
  ClinicProfile,
);
