import { connect } from 'react-redux';
import moment from 'moment';
import {
  toggleSetAppointment,
} from '../../../store/actions/booking';
import { displayAvailability } from '../../../store/actions/availability';
import {addBooking} from '../../../store/actions/booking';
import { removeAvailability } from '../../../store/actions/availability';

class BookingForm extends React.Component {
  state = {
    remarks: ''
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      startTime:  this.props.availability.startTime,
      date:moment(this.props.availability.date).format('MMMM D, YYYY'),
      remarks: this.state.remarks
    }
    this.props.addBooking(bookingData);
    this.props.removeAvailability(this.props.availability.id);
    this.setState(() => ({
      remarks: ''
    }))
    this.props.toggleSetAppointment()
  };
  
  render() {
    return (
      <div>
        <label className="auth-label" htmlFor="remarks">
          Remarks:
        </label>
        <textarea
          id="remarks"
          rows={10}
          onChange={(e) => this.handleChange('remarks', e.target.value)}
          placeholder="Give us a short background of your concern"
          value={this.state.remarks}
        />
        <div className="form-group">
          <button
            type="submit"
            className="confirm-booking"
            onClick={this.handleSubmit}
          >
                    Confirm
          </button>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="confirm-booking"
            onClick={() => this.props.toggleSetAppointment()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  availability: state.displayedAvailability,
});

export default connect(mapStateToProps, {
  toggleSetAppointment,
  removeAvailability,
  displayAvailability,
  addBooking
})(BookingForm);
