import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listPractitioners } from '../../../store/actions/practitioners';
import { fetchPractitionersByClinicId } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';
import PractitionerBox from './PractitionerBox';

const PractitionerList = ({
  fetchPractitionersByClinicId,
  practitioners,
  listPractitioners,
  clinic,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPractitionersByClinicId(clinic.id);
    return () => {
      listPractitioners([]);
    };
  }, []);

  return (
    <div className="practitionerList-container">
      <h3 className="clinic-name">Doctors who works here</h3>
      {practitioners.map(practitioner => (
        <PractitionerBox key={practitioner.id} practitioner={practitioner} />
      ))}
    </div>
  );
};

PractitionerList.propTypes = {
  practitioners: PropTypes.instanceOf(Object).isRequired,
  fetchPractitionersByClinicId: PropTypes.func.isRequired,
  listPractitioners: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  practitioners: state.practitioners,
  clinic: state.displayedClinic,
});

export default connect(mapStateToProps, {
  fetchPractitionersByClinicId,
  listPractitioners,
})(PractitionerList);
