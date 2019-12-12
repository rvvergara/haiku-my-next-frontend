import Link from 'next/link';
import { connect } from 'react-redux';

const Clinics = ({ currentUserData, clinics }) => {
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

export default connect(mapStateToProps)(Clinics);
