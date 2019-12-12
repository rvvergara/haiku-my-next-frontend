import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listPractitioners } from '../../../store/actions/practitioners';
import { fetchPractitioners } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';
import PractitionerBox from '../../Authenticated/Practitioner/PractitionerBox';

const PractitionerList = ({
  fetchPractitioners,
  practitioners,
  listPractitioners,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
   fetchPractitioners();
    return () => {
      listPractitioners([]);
    };
  }, []);

  return (
    <div>
      {practitioners.map(practitioner => (
        <PractitionerBox key={practitioner.id} practitioner={practitioner} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  practitioners: state.practitioners,
});

export default connect(mapStateToProps, {
  fetchPractitioners,
  listPractitioners,
})(PractitionerList);
