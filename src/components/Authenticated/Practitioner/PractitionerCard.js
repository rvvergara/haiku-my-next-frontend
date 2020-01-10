import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';

const PractitionerCard = ({ practitioner, t }) => {
  const defaultPic = 'https://i.imgur.com/GJxJnJ1.png';
  return (
    <div className="practitioner-card">
      <div className="practitionerCard-image-container">
        <img
          className="practitionerCard-image"
          src={practitioner.image === null ? defaultPic : practitioner.image}
          alt="doctor-profile"
        />
      </div>

      <div className="practitionerCard-info-container">
        <span className="practitioner-card-specialties">
          {JSON.parse(practitioner.specialties).join(', ')}
        </span>
        <h2 className="practitioner-name">{`${practitioner.firstName} ${practitioner.lastName}`}</h2>
        <div className="profile-info-container__info__card">
          <h4 className="practitioner-card-education">
            {t('education')}
          </h4>
          <ul className="profile-list grotesque-font">
            <li className="practitioner-card-">
              {JSON.parse(practitioner.education).join(', ')}
            </li>
          </ul>
        </div>
        <div className="profile-info-container__info__card">
          <h4 className="grotesque-font profile-info-container__info__card__title">
            {t('specialties')}
          </h4>
          <ul className="profile-list grotesque-font">
            <li className="grotesque-font profile-info-container__info__card__content">
              {JSON.parse(practitioner.specialties).join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

PractitionerCard.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  practitioner:
    Object.keys(state.displayedPractitioner).length > 0
      ? state.displayedPractitioner
      : state.currentUser.data.practitioner,
});

export default connect(mapStateToProps)(withTranslation('practitionerCard')(PractitionerCard));
