import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';

const Reminder = ({ notification }) => {
  const stringedBookingSlotStart = new Date(`${notification.notifiable.date} ${notification.notifiable.startTime}`);
  const aboutToHappen = moment(stringedBookingSlotStart) <= moment().add(30, 'minutes');
  return (
    <li key={notification.id}>
      <p className="">
              You have appointment with :
        {' '}
        {`Dr. ${notification.practitionerActor.firstName} ${notification.practitionerActor.lastName}`}
      </p>
      <p className="">
        Date :
        {notification.notifiable.date}
      </p>
      <p className="">
              Time :
        {' '}
        {notification.notifiable.startTime}
-
        {' '}
        {notification.notifiable.endTime}
      </p>
      {
        aboutToHappen && (
          <Link href={`/video?token=${notification.notifiable.callToken}`}>
            <a>Join Call Now</a>
          </Link>
        )
      }
    </li>
);
};

Reminder.propTypes = {
  notification: PropTypes.instanceOf(Object).isRequired,
};

export default Reminder;
