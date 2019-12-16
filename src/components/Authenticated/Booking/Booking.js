import BookingForm from './BookingForm';

const Booking = () => (
  <div className="booking-container">
    <div className="booking-form-header">
      <h3>Book an Appointment</h3>
      <p>Monday to Friday 09.00am-06.00pm</p>
    </div>
    <BookingForm />
  </div>
  );

export default Booking;
