import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSessionDuration } from '../../../store/actions/availability';
import DurationButton from './DurationButton';

const SessionDuration = ({ setSessionDuration, sessionDuration }) => {
  const [durationValue, setDurationValue] = useState(sessionDuration);
  const handleClick = (value) => {
    setSessionDuration(parseInt(value));
    setDurationValue(value);
  };
  return (
    <div>
      <h3>Choose Duration</h3>
      <div className="duration-container">
        <DurationButton
          value={30}
          isActive={durationValue === 30}
          onClick={handleClick}
        />
        <DurationButton
          value={60}
          isActive={durationValue === 60}
          onClick={handleClick}
        />
        <DurationButton
          value={120}
          isActive={durationValue === 120}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sessionDuration: state.sessionDuration,
});

SessionDuration.propTypes = {
  setSessionDuration: PropTypes.func.isRequired,
  sessionDuration: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { setSessionDuration })(SessionDuration);
