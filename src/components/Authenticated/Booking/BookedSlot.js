import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../store/thunks/patient';
import { confirmBookingSlotInDb, rejectBookingSlot } from '../../../store/thunks/availability';
import { setAuthorizationToken } from '../../../utils/api';

const BookedSlot = ({
 booking, fetchPatient, confirmBookingSlotInDb, rejectBookingSlot,
}) => {
  let patient;
  useEffect(() => {
    fetchPatient(booking.patientId)
      .then((data) => {
        patient = data;
      }).then(() => console.log('PATIENT TO SHOW', patient));
  }, []);
  return (
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
      Patient:
        {' '}
        { patient && patient.firstName}
      </p>
      {booking.status === 'PENDING' && (
      <div>
        <button
          type="button"
          className="theme-button"
          onClick={() => confirmBookingSlotInDb(booking.id)}
        >
        Accept
        </button>
        <button
          type="button"
          className="theme-button"
          onClick={() => rejectBookingSlot(booking.id)}
        >
        Reject
        </button>
      </div>
    )}
    </div>
);
};

export default connect(null, { fetchPatient, confirmBookingSlotInDb, rejectBookingSlot })(BookedSlot);
