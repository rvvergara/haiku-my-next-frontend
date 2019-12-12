import Link from 'next/link';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchClinics } from '../../../store/thunks/clinic';
import { setAuthorizationToken } from '../../../utils/api';
import {listClinics} from '../../../store/actions/clinic'


const Clinics = ({ currentUserData, clinics, fetchClinics,listClinics }) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchClinics();
    return () =>{
      listClinics([])
    }
  }, []);

  return (
    <div>
      {currentUserData.role === 'practitioner' && (
        <Link href="/clinics/new">
          <a href="/clinics/new" className="nav-link">
            Add new clinic
          </a>
        </Link>
      )}

      {clinics.map(clinic => (
        <div key={clinic.id}>{clinic.name}</div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
  clinics: state.clinics,
});

export default connect(mapStateToProps, { fetchClinics,listClinics })(Clinics);
