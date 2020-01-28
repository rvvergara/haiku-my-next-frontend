import moment from 'moment';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';
import { setSessionStartTime } from '../../../store/actions/availability';

const SessionTimes = ({
  sessionDuration,
  sessionStartTime,
  setSessionStartTime,
  t,
}) => {
  const format = 'h:mm a';
  const handleChange = val => {
    if (val) setSessionStartTime(val.format(format));
  };

  const getDisabledHours = () => {
    let hours = [];
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  console.log(moment().format('hh a'));

  return (
    <div className="scheduler-inner-component-container">
      <h3 className="scheduler-inner-component__title">{t('time')}</h3>
      <label htmlFor="from-time" className="auth-label schedule-label">
        {t('startTime')}
      </label>
      <TimePicker
        id="from-time"
        showSecond={false}
        defaultValue={moment('9:00 am', 'LTS')}
        className="xxx"
        onChange={handleChange}
        format={format}
        use12Hours
        inputReadOnly
        disabledHours={getDisabledHours}
      />
      <label htmlFor="to-time" className="auth-label schedule-label">
        {t('endTime')}
      </label>
      <span className="rc-time-picker xxx read-only-time-span">
        <span className="rc-time-picker-input">
          {moment(sessionStartTime, 'h:mm a')
            .add(sessionDuration, 'minutes')
            .format('LT')}
        </span>
      </span>
    </div>
  );
};

SessionTimes.propTypes = {
  sessionDuration: PropTypes.number.isRequired,
  setSessionStartTime: PropTypes.func.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  sessionStartTime: state.sessionStartTime,
  sessionDuration: state.sessionDuration,
});

export default connect(mapStateToProps, { setSessionStartTime })(
  withTranslation('scheduleForm')(SessionTimes),
);
