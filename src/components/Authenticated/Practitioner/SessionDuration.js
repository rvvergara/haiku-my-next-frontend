import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';
import { setSessionDuration } from '../../../store/actions/availability';
import DurationButton from './DurationButton';

const SessionDuration = ({ setSessionDuration, sessionDuration, t }) => {
  const [durationValue, setDurationValue] = useState(sessionDuration);
  const [customValue, setCustomValue] = useState('');
  const handleClick = value => {
    setSessionDuration(parseInt(value));
    setDurationValue(value);
  };

  const handleChange = value => {
    const re = /^\d+(\.\d{0,2})?$/gi;
    if (!value || value.match(re)) {
      setSessionDuration(parseInt(value || '0'));
      setCustomValue(value);
      setDurationValue(value || 0);
    }
  };

  return (
    <div className="scheduler-inner-component-container">
      <h3 className="scheduler-inner-component__title">{t('duration')}</h3>
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
            type="text"
            className={
              durationValue === customValue
                ? 'selected-duration booking-duration'
                : 'booking-duration'
            }
            value={customValue}
            placeholder="Set custom minutes"
            onChange={e => handleChange(e.target.value)}
            onFocus={() => handleChange('')}
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
  withTranslation('scheduleForm')(SessionDuration),
);
