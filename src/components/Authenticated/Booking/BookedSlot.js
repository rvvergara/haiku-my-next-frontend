
const BookedSlot = ({ booking }) => (
  <div>
    <p>
      Date:
      {booking.date}
    </p>
    <p>
      Time:
      {booking.startTime}
      {' '}
      to
      {' '}
      {booking.endTime}
    </p>
    <p>
      PatientID:
      {' '}
      {booking.patientId}
    </p>
  </div>
);

export default BookedSlot;
