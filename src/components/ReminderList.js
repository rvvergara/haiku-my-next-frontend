import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUpcomingAppointment } from '../store/thunks/upcomingAppointment';
import { setAuthorizationToken } from '../utils/api';
import Reminder from './Reminder';

const ReminderList = ({
  upcomingAppointment,
  currentUserData,
  fetchUpcomingAppointment,
}) => {
  const userRole = currentUserData.role.toLowerCase();
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchUpcomingAppointment(
      currentUserData.role,
      currentUserData[userRole].id,
    );
  }, []);
  return upcomingAppointment.length < 1 ? null : (
    <div className="remainder-container">
      <div className="">
        <h4>Upcoming Appointment</h4>
      </div>
      <ul>
        {upcomingAppointment.map(appointment => (
          <Reminder
            key={appointment.id}
            appointment={appointment}
            currentUserData={currentUserData}
          />
        ))}
      </ul>
    </div>
  );
};

ReminderList.propTypes = {
  // notifications: PropTypes.instanceOf(Object).isRequired,
  upcomingAppointment: PropTypes.instanceOf(Object).isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
};

// const filterOnlyConfirmedNotifables = bookingSlotNotifiables =>
//   bookingSlotNotifiables.filter(slot => slot.notifiable.status === 'CONFIRMED');

const mapStateToProps = state => {
  // const slotsOnly = state.notifications.filter(
  //   notif => notif.notifiableType === 'BOOKING_SLOT',
  // );
  return {
    // notifications: filterOnlyConfirmedNotifables(slotsOnly),
    currentUserData: state.currentUser.data,
    upcomingAppointment: state.upcomingAppointment,
  };
};

export default connect(mapStateToProps, { fetchUpcomingAppointment })(
  ReminderList,
);
