const Booking = () => {
  return (
    <div className="booking-container">
      <div className="booking-form-header">
        <h3>Book A visit</h3>
        <p>Monday to Friday 09.00am-06.00pm</p>
      </div>
      <form className="user-form profile-form">
          <div className="form-group">
            <label htmlFor="patient-number" className="auth-label">
           Phone Number
            </label>
            <input
              id="patient-number"
              className="user-form__input"
              type="text"

            />
          </div>

          <div className="form-group">
            <label htmlFor="booking-date" className="auth-label">
             Select Date
            </label>
            <input
              className="user-form__input"
              id="booking-date"
              type="date"

            />
          </div>

          <div className="form-group">
            <label htmlFor="booking-time" className="auth-label">
              Hour
            </label>
            <input
              id="booking-time"
              className="user-form__input"
              type="time"
            />
          </div>



          <div className="form-group">
            <button className="user-form__button">
              Book Appointment
            </button>
          </div>
        </form>
    </div>
  )
}

export default Booking