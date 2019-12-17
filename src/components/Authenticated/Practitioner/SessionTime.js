import { connect } from 'react-redux';

const SessionTimes = () => (
  <div>
    <button type="button" className="booking-availabilities">
        10:00AM
    </button>
    <button type="button" className="booking-availabilities">
        02:00PM
    </button>
  </div>
  );

export default connect()(SessionTimes);
