import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { setSessionDuration } from '../../../store/actions/availability';
import DurationButton from './DurationButton';

const SessionDuration = ({ setSessionDuration, sessionDuration }) => {
  const [durationValue, setDurationValue] = useState(sessionDuration);
  const [customValue, setCustomValue] = useState();
  const handleClick = value => {
    setSessionDuration(parseInt(value));
    setDurationValue(value);
  };

  const handleChange = value => {
    setSessionDuration(parseInt(value));
    setDurationValue(value);
    setCustomValue(value);
  };

  return (
    <div className="scheduler-inner-component-container">
      <h3 className="scheduler-inner-component__title">Choose Duration</h3>
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
        <div>
          <input
            type="number"
            // className="custom-minutes"
            className={
              durationValue === customValue
                ? 'selected-duration booking-duration'
                : 'booking-duration'
            }
            value={customValue}
            placeholder="Set custom minutes"
            onChange={e => handleChange(e.target.value)}
            onFocus={e => handleChange(customValue)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  sessionDuration: state.sessionDuration,
});

SessionDuration.propTypes = {
  setSessionDuration: PropTypes.func.isRequired,
  sessionDuration: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { setSessionDuration })(
  SessionDuration,
);
