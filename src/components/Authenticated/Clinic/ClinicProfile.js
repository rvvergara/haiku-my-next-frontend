import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setClinic } from '../../../store/actions/clinic';
import PractitionerListClinic from '../Practitioner/PractitionerListClinic';
import { withTranslation } from '../../../../i18n';

const ClinicProfile = ({
 setClinic, clinic, practitioner, t,
}) => {
  const {
 name, address, postalCode, image, category, openingHours,
} = clinic;

  const defaultPic = 'https://images.unsplash.com/photo-1533042789716-e9a9c97cf4ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
  // const handleAdd = () => {
  //   addPractitionerToClinic(clinic.id, { practitionerId: practitioner.id });
  // };

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
            src={image || defaultPic}
            alt="clinic-profile"
          />
        </div>

        <div className="clinic-profile-info-container">
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
                <h3>{t('opening-hours')}</h3>
                <li>{openingHours}</li>
              </ul>
              <h3>
                {t('category')}
                {' '}
                {category}
              </h3>
            </ul>
            {/* <button onClick={handleAdd}>Add me to this clinic</button> */}
          </div>
        </div>
      </div>

      <PractitionerListClinic />
    </div>
  );
};

ClinicProfile.propTypes = {
  clinic: PropTypes.instanceOf(Object).isRequired,
  setClinic: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clinic: state.displayedClinic,
  practitioner: state.currentUser.data.practitioner,
});

export default connect(mapStateToProps, { setClinic })(withTranslation('clinicProfile')(ClinicProfile));
