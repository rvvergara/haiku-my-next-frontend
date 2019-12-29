import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../store/thunks/patient';
import { confirmBookingSlot, rejectBookingSlot } from '../../../store/thunks/availability';
import { setAuthorizationToken } from '../../../utils/api';

const BookedSlot = ({
 booking, fetchPatient, confirmBookingSlot, rejectBookingSlot,
}) => {
  useEffect(() => {

  }, [booking.status]);
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
      PatientID:
        {' '}
        {booking.patientId}
      </p>
      {booking.status === 'PENDING' && (
      <div>
        <button
          className="theme-button"
          onClick={() => confirmBookingSlot(booking.id)}
        >
        Accept
        </button>
        <button
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

export default connect(null, { fetchPatient, confirmBookingSlot, rejectBookingSlot })(BookedSlot);
