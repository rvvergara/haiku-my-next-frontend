import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listPractitioners } from '../../../store/actions/practitioners';
import { fetchPractitioners } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';

const PractitionerList = ({
  fetchPractitioners,
  practitioners,
  listPractitioners,
}) => {
  useEffect(async () => {
    setAuthorizationToken(localStorage.token);
    await fetchPractitioners();
    return () => {
      listPractitioners([]);
    };
  }, []);

  return (
    <div>

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
