const SessionDuration = () => {
  return (
    <div>
      <h3>Choose Duration</h3>
      <div className="duration-container">
        <button type="button" className="booking-duration">
          30 minutes
        </button>
        <button type="button" className="booking-duration">
          60 minutes
        </button>
        <button type="button" className="booking-duration">
          120 minutes
        </button>
      </div>
    </div>
  );
};

export default SessionDuration;
