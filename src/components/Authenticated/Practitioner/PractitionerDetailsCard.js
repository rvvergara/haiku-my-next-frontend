import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from '../../../../i18n';

const PractitionerDetailsCard = ({ practitioner, t }) => (
  <div className="practitioner-details-container">
    <div className="practitionerDtails-info">
      <div className="profile-info-container__info__card container">
        <h4 className="grotesque-font profile-info-container__info__card__title">
          {t('biography')}
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
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  practitioner: Object.keys(state.displayedPractitioner).length > 0
  ? state.displayedPractitioner
  : state.currentUser.data.practitioner,
});

export default connect(mapStateToProps)(withTranslation('practitionerCard')(PractitionerDetailsCard));
