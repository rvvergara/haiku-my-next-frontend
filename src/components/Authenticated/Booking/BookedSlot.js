import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../store/thunks/patient';
import { setAuthorizationToken } from '../../../utils/api';

const BookedSlot = ({ booking, fetchPatient }) => {
  console.log(booking.patientId);
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
    </div>
);
};

export default connect(null, { fetchPatient })(BookedSlot);
