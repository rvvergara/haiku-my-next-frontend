import Router from 'next/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PractitionerList from '../../../components/Authenticated/Practitioner/PractitionerList';
import { setClinic } from '../../../store/actions/clinic';
import { fetchOneClinic } from '../../../store/thunks/clinic';
import { setAuthorizationToken } from '../../../utils/api';

const ClinicProfile = ({ fetchOneClinic, setClinic, clinic }) => {
  const { name, address, postalCode } = clinic;

  useEffect(() => {
    if (process.browser) {
      setAuthorizationToken(localStorage.token);
    }
    fetchOneClinic(Router.query.id);
    return () => {
      setClinic({});
    };
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

const mapStateToProps = state => ({
  clinic: state.displayedClinic,
});

export default connect(mapStateToProps, { fetchOneClinic, setClinic })(
  ClinicProfile,
);
