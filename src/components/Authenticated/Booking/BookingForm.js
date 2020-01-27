import { connect } from 'react-redux';
import { setAlert } from '../../../store/actions/alerts';
import {
  displayAvailability,
  removeAvailability,
} from '../../../store/actions/availability';
import { toggleSetAppointment } from '../../../store/actions/booking';
import { bookSlot } from '../../../store/thunks/booking';
import { withTranslation} from '../../../../i18n';

class BookingForm extends React.Component {
  state = {
    remarks: '',
  };

  componentWillUnmount() {
    this.props.toggleSetAppointment(false);
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      patientId: this.props.currentUserData.patient.id,
      remarks: this.state.remarks,
    };
    this.setState(() => ({
      remarks: '',
    }));
    this.props.toggleSetAppointment(false);
    this.props.bookSlot(bookingData, this.props.availability.id);
    this.props.setAlert('Booking Created', 'success');
  };

  render() {
    const { t } = this.props;

    return (
      <div className="booking-modal">
        <div className="booking-form-title">
          <p className="grotesque-font">Date: {this.props.availability.date}</p>
          <p className="grotesque-font">
            {t('start-time')} {this.props.availability.startTime}
          </p>
          <p className="grotesque-font">
          {t('end-time')} {this.props.availability.endTime}
          </p>
        </div>
        <label className="remark-label" htmlFor="remarks">
        {t('remarks')}
        </label>
        <textarea
          id="remarks"
          rows={10}
          onChange={e => this.handleChange('remarks', e.target.value)}
          placeholder="Give us a short background of your concern"
          value={this.state.remarks}
        />

        <div className="booking-button">
          <button
            type="submit"
            className="confirm-booking"
            onClick={this.handleSubmit}
          >
            {t('confirm')}
          </button>
          <button
            type="button"
            className="confirm-booking orange"
            onClick={() => this.props.toggleSetAppointment(false)}
          >
            {t('go-back')}
          </button>

          <div className="form-group"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  availability: state.displayedAvailability,
  currentUserData: state.currentUser.data,
});

export default connect(mapStateToProps, {
  toggleSetAppointment,
  removeAvailability,
  displayAvailability,
  bookSlot,
  setAlert
})(withTranslation('bookingForm')(BookingForm));
