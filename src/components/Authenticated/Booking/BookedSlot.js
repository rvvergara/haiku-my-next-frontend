import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatient } from '../../../store/thunks/patient';
import { setAuthorizationToken } from '../../../utils/api';

const BookedSlot = ({ booking, fetchPatient }) => (
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
    <button className="theme-button">Accept</button>
    <button className="theme-button">Reject</button>
  </div>
);

export default connect(null, { fetchPatient })(BookedSlot);
