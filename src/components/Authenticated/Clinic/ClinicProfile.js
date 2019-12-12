import { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { fetchOneClinic } from '../../../store/thunks/clinic';
import { setClinic } from '../../../store/actions/clinic';
import { setAuthorizationToken } from '../../../utils/api';

const ClinicProfile = ({ fetchOneClinic, setClinic, clinic }) => {
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
    <div>
      <h1>{clinic.name}</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  clinic: state.displayedClinic,
});

export default connect(mapStateToProps, { fetchOneClinic, setClinic })(ClinicProfile);
