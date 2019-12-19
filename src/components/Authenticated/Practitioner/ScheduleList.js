import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listAvailabilies } from '../../../store/actions/availability';
import dummyAvailabilities from '../../../Dummy/availabilites';

const ScheduleList = ({ availabilities, listAvailabilies }) => {
  useEffect(() => {
    listAvailabilies(dummyAvailabilities);
    return () => listAvailabilies([]);
  }, []);
  return (
    <div>
      {
        availabilities.map((availability) => (
          <div key={availability.id}><strong>{availability.date}</strong></div>
        ))
      }
    </div>
);
};

ScheduleList.propTypes = {
  availabilities: PropTypes.instanceOf(Object).isRequired,
  listAvailabilies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  availabilities: state.availabilities,
});

export default connect(mapStateToProps, { listAvailabilies })(ScheduleList);
