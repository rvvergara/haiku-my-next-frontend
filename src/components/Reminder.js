import moment from 'moment';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Reminder = ({ appointment, currentUserData }) => {
  const stringedBookingSlotStart = new Date(
    `${appointment.date} ${appointment.startTime}`,
  );
  const aboutToHappen =
    moment(stringedBookingSlotStart) <= moment().add(30, 'minutes');
  return currentUserData.role === 'PRACTITIONER' ? (
    <li key={appointment.id}>
      <p className="">
        You have appointment with :{' '}
        {` ${appointment.patient.firstName} ${appointment.patient.lastName}`}
      </p>
      <p className="">Date :{appointment.date}</p>
      <p className="">
        Time : {appointment.startTime}- {appointment.endTime}
      </p>
      {aboutToHappen && (
        <Link href={`/video?token=${appointment.callToken}`}>
          <a>Join Call Now</a>
        </Link>
      )}
    </li>
  ) : (
    <li key={appointment.id}>
      <p className="">
        You have appointment with :{' '}
        {`Dr. ${appointment.practitioner.firstName} ${appointment.practitioner.lastName}`}
      </p>
      <p className="">Date :{appointment.date}</p>
      <p className="">
        Time : {appointment.startTime}- {appointment.endTime}
      </p>
      {aboutToHappen && (
        <Link href={`/video?token=${appointment.callToken}`}>
          <a>Join Call Now</a>
        </Link>
      )}
    </li>
  );
};

Reminder.propTypes = {
  appointment: PropTypes.instanceOf(Object).isRequired,
};

export default Reminder;
