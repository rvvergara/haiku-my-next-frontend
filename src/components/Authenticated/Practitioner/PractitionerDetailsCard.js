import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PractitionerDetailsCard = ({ practitioner }) => (
  <div className="practitioner-details-container">
    <div className="practitionerDtails-info">
      <div className="profile-info-container__info__card container">
        <h4 className="grotesque-font profile-info-container__info__card__title">
          Bio
        </h4>
        <p className="grotesque-font profile-info-container__info__card__content">
          {
            practitioner.biography
          }
        </p>
      </div>
    </div>
  </div>
);

PractitionerDetailsCard.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  practitioner: Object.keys(state.displayedPractitioner).length > 0
  ? state.displayedPractitioner
  : state.currentUser.data.practitioner,
});

export default connect(mapStateToProps)(PractitionerDetailsCard);
