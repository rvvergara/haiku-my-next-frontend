import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSessionDuration } from '../../../store/actions/availability';

const SessionDuration = ({ setSessionDuration }) => {
  const handleClick = (e) => {
    setSessionDuration(parseInt(e.target.value));
  };
  return (
    <div>
      <h3>Choose Duration</h3>
      <div className="duration-container">
        <button
          type="button"
          className="booking-duration"
          value={30}
          onClick={handleClick}
        >
          30 minutes
        </button>
        <button
          type="button"
          className="booking-duration"
          value={60}
          onClick={handleClick}
        >
          60 minutes
        </button>
        <button
          type="button"
          className="booking-duration"
          value={120}
          onClick={handleClick}
        >
          120 minutes
        </button>
      </div>
    </div>
  );
};

SessionDuration.propTypes = {
  setSessionDuration: PropTypes.func.isRequired,
};

export default connect(null, { setSessionDuration })(SessionDuration);
