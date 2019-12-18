import Link from 'next/link';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listClinics } from '../../../store/actions/clinic';
import { fetchClinics } from '../../../store/thunks/clinic';
import { setAuthorizationToken } from '../../../utils/api';
import ClinicCard from './ClinicCard';

const ClinicList = ({
  currentUserData,
  clinics,
  fetchClinics,
  listClinics,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchClinics();
    return () => {
      listClinics([]);
    };
  }, []);

  return (
    <div>
      {currentUserData.role === 'practitioner' && (
        <Link href="/clinics/new">
          <a href="/clinics/new" className="nav-link add-clinic-button">
            Add new clinic
          </a>
        </Link>
      )}

      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
};

ClinicList.propTypes = {
  clinics: PropTypes.instanceOf(Object).isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  fetchClinics: PropTypes.func.isRequired,
  listClinics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  clinics: state.clinics,
});

export default connect(mapStateToProps, { fetchClinics, listClinics })(
  ClinicList,
);
