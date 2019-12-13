import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PractitionerCard = ({ practitioner }) => (
  <div className="practitioner-card">
    <div className="profile-image">
      <img
        className="profile-image__avatar"
        src={practitioner.image}
        alt="doctor-profile"
      />
    </div>

    <div className="profile-info-container">
      <span className="specialties">{practitioner.specialities.join(', ')}</span>
      <h2 className="practitioner-name">Dr. Peter Goh Min Yih.</h2>
      <h3 className="clinic">Advanced Surgical Group</h3>
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font profile-info-container__info__card__title">Education</h4>
        <ul className="profile-list grotesque-font">
          {
            practitioner.education.map((educ) => (
              <li
                className="grotesque profile-info-container__info__card__content"
                key={educ}
              >
                {educ}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font profile-info-container__info__card__title">Specialialties</h4>
        <ul className="profile-list grotesque-font">
          {
            practitioner.specialities.map((specialty) => (
              <li
                className="grotesque-font profile-info-container__info__card__content"
                key={specialty}
              >
                {specialty}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </div>
);

PractitionerCard.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  practitioner: Object.keys(state.displayedPractitioner).length > 0
  ? state.displayedPractitioner
  : state.currentUser.data.profile,
});

export default connect(mapStateToProps)(PractitionerCard);
