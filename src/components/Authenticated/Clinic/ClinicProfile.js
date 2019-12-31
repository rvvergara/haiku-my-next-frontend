import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setClinic } from '../../../store/actions/clinic';
import { addPractitionerToClinic } from '../../../store/thunks/clinic';
import PractitionerList from '../Practitioner/PractitionerList';

const ClinicProfile = ({ setClinic, clinic, practitioner }) => {
  const { name, address, postalCode, image, category, openingHours } = clinic;

  const defaultPic =
    'https://images.unsplash.com/photo-1533042789716-e9a9c97cf4ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

  const handleAdd = () => {
    console.log('asdas');
    addPractitionerToClinic(clinic.id, { practitionerId: practitioner.id });
  };

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
            src={image === null ? defaultPic : image}
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
            <button onClick={handleAdd}>Add me to this clinic</button>
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
  practitioner: state.currentUser.data.practitioner,
});

export default connect(mapStateToProps, { setClinic })(ClinicProfile);
