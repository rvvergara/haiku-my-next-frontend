const Booking = () => {
  return (
    <div className="booking-container">
      <div className="booking-form-header">
        <h3>Book an Appointment</h3>
        <p>Monday to Friday 09.00am-06.00pm</p>
      </div>
      <form className="user-form profile-form">
        <div className="form-group">
          <label htmlFor="booking-date" className="auth-label">
            Select Date
          </label>
          <input className="user-form__input" id="booking-date" type="date" />
        </div>

        <div className="form-group">
          <label htmlFor="booking-time" className="auth-label">
            Hour
          </label>
          <select name="time">
            <option value="volvo">8:00AM</option>
            <option value="saab">9:30AM</option>
            <option value="fiat">11:00AM</option>
            <option value="audi">3:00PM</option>
          </select>
        </div>

        <div className="form-group">
          <button className="user-form__button">Book Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
