import moment from 'moment';

const Reminder = ({ notification }) => {
  const stringedBookingSlotStart = new Date(`${notification.notifiable.date} ${notification.notifiable.startTime}`);
  const aboutToHappen = moment(stringedBookingSlotStart).add(1, 'hour') >= moment();
  console.log('ABOUT TO HAPPEN?', aboutToHappen);
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
    </li>
);
};

export default Reminder;
