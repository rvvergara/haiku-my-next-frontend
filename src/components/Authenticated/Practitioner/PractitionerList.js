import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listPractitioners } from '../../../store/actions/practitioners';
import { fetchAllPractitioner } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';
import Filter from '../../Authenticated/Filter';
import Remainder from '../../Remainder';
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
        <Remainder />
        <Filter />
      </div>
      <div>
        {practitioners.map(practitioner => (
          <PractitionerBox key={practitioner.id} practitioner={practitioner} />
        ))}
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
