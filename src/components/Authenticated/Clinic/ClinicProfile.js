import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setClinic } from '../../../store/actions/clinic';
import PractitionerList from '../Practitioner/PractitionerList';

const ClinicProfile = ({ setClinic, clinic }) => {
  const { name, address, postalCode, image, category,openingHours } = clinic;

  useEffect(
    () => () => {
      setClinic({});
    },
    [],
  );
  return (
    <div className="clinic-profile-card">
      <div className="clinic-profile-container">
        <div className="profile-image">
          <img
            className="clinic-profile-image"
            src={image}
            alt="clinic-profile"
          />
        </div>

        <div className="profile-info-container fixed-width">
          <h2 className="practitioner-name clinic-name">{name}</h2>
          <div className="profile-info-container__info__card">
            <ul className="profile-list grotesque-font">
              <li className="grotesque-font profile-info-container__info__card__content">
                {address}
              </li>
              <li className="grotesque-font profile-info-container__info__card__content">
                {postalCode}
              </li>
              <ul className="clinic-opening-hours">
                <h3>Clinic Opening Hours</h3>
                <li>{openingHours}</li>
              </ul>
              <h3>Category : {category}</h3>
            </ul>
          </div>
        </div>
      </div>

      <PractitionerList />
    </div>
  );
};

ClinicProfile.propTypes = {
  clinic: PropTypes.instanceOf(Object).isRequired,
  setClinic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  clinic: state.displayedClinic,
});

export default connect(mapStateToProps, { setClinic })(ClinicProfile);
