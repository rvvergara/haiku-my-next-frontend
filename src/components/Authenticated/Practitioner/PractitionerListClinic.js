import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listPractitioners } from '../../../store/actions/practitioners';
import { fetchPractitionersByClinicId } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';
import PractitionerBox from './PractitionerBox';
import { withTranslation } from '../../../../i18n';

const PractitionerListClinic = ({
  fetchPractitionersByClinicId,
  practitioners,
  listPractitioners,
  clinic,
  t,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchPractitionersByClinicId(clinic.id);
    return () => {
      listPractitioners([]);
    };
  }, []);

  return (
    <div className="practitionerList-container ">
      <h3 className="clinic-name">
        {t('doctors-who-work-here')}
      </h3>
      {practitioners.map((practitioner) => (
        <PractitionerBox key={practitioner.id} practitioner={practitioner} />
      ))}
    </div>
  );
};

PractitionerListClinic.propTypes = {
  practitioners: PropTypes.instanceOf(Object).isRequired,
  fetchPractitionersByClinicId: PropTypes.func.isRequired,
  listPractitioners: PropTypes.func.isRequired,
  clinic: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  practitioners: state.practitioners,
  clinic: state.displayedClinic,
});

export default connect(mapStateToProps, {
  fetchPractitionersByClinicId,
  listPractitioners,
})(withTranslation('practitionerListClinic')(PractitionerListClinic));
