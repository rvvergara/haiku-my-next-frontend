import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PractitionerCard = ({ practitioner }) => (
  <div className="practitioner-card">
    <div className="profile-image">
      <img
        className="practitionerCard-image"
        src={practitioner.image}
        alt="doctor-profile"
      />
    </div>

    <div className="profile-info-container">
      <span className="specialties">{JSON.parse(practitioner.specialties).join(', ')}</span>
      <h2 className="practitioner-name">{`${practitioner.firstName} ${practitioner.lastName}`}</h2>
      {/* <h3 className="clinic">Advanced Surgical Group</h3> */}
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font profile-info-container__info__card__title">
          Education
        </h4>
        <ul className="profile-list grotesque-font">
          <li className="grotesque profile-info-container__info__card__content">
            {JSON.parse(practitioner.education).join(', ')}
          </li>
        </ul>
      </div>
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font profile-info-container__info__card__title">
          Specialities
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

PractitionerCard.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  practitioner:
    Object.keys(state.displayedPractitioner).length > 0
      ? state.displayedPractitioner
      : state.currentUser.data.profile,
});

export default connect(mapStateToProps)(PractitionerCard);
