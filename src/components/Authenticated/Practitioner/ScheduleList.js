import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import dummyAvailabilities from '../../../Dummy/availabilites';
import { listAvailabilies } from '../../../store/actions/availability';

const ScheduleList = ({ availabilities, listAvailabilies }) => {
  useEffect(() => {
    listAvailabilies(dummyAvailabilities);
    return () => listAvailabilies([]);
  }, []);
  return (
    <div className="scheduler-container">
      {availabilities.map(availability => (
        <div>
          <div key={availability.id}>
            <strong>{availability.date}</strong>
          </div>
          <div> From {availability.startTime} To {availability.endTime}</div>
        </div>
      ))}
    </div>
  );
};

ScheduleList.propTypes = {
  availabilities: PropTypes.instanceOf(Object).isRequired,
  listAvailabilies: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  availabilities: state.availabilities,
});

export default connect(mapStateToProps, { listAvailabilies })(ScheduleList);
