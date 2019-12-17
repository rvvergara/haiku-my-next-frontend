import moment from 'moment';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';
import { setSessionStartTime } from '../../../store/actions/availability';

const SessionTimes = ({
  sessionDuration,
  sessionStartTime,
  setSessionStartTime,
}) => {
  const format = 'h:mm a';
  const now = moment(sessionStartTime, 'LTS');
  const handleChange = val => {
    if (val) setSessionStartTime(val.format(format));
  };

  return (
    <div>
      <label htmlFor="from-time">Start Time: </label>
      <TimePicker
        id="from-time"
        showSecond={false}
        defaultValue={now}
        className="xxx"
        onChange={handleChange}
        format={format}
        use12Hours
        inputReadOnly
      />
      <label htmlFor="to-time">End time:</label>
      <strong>
        {moment(sessionStartTime, 'h:mm')
          .add(sessionDuration, 'minutes')
          .format('LT')}
      </strong>
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

export default connect(mapStateToProps, { setSessionStartTime })(SessionTimes);
