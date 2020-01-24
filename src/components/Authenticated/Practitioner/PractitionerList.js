import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PractitionerListPlaceholder from '../../../../Placeholder/PractitionerListPlaceholder';
import { listPractitioners } from '../../../store/actions/practitioners';
import { fetchAllPractitioner } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';
import ReminderList from '../../ReminderList';
import Filter from '../Filter';
import PractitionerBox from './PractitionerBox';

const PractitionerList = ({
  fetchAllPractitioner,
  practitioners,
  listPractitioners,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchAllPractitioner();
    return () => {
      listPractitioners([]);
    };
  }, []);

  return (
    <div className="practitionerList-container">
      <div className="sidebar">
        <ReminderList />
        <Filter />
      </div>
      <div>
        {practitioners.length < 1 ? (
          <PractitionerListPlaceholder />
        ) : (
          practitioners.map(practitioner => (
            <PractitionerBox
              key={practitioner.id}
              practitioner={practitioner}
            />
          ))
        )}
      </div>
    </div>
  );
};

PractitionerList.propTypes = {
  practitioners: PropTypes.instanceOf(Object).isRequired,
  fetchAllPractitioner: PropTypes.func.isRequired,
  listPractitioners: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  practitioners: state.practitioners,
});

export default connect(mapStateToProps, {
  fetchAllPractitioner,
  listPractitioners,
})(PractitionerList);
