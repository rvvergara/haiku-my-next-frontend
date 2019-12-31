import Link from 'next/link';
import PropTypes from 'prop-types';

const ClinicCard = ({ clinic }) => {
  const { name, address, postalCode,image } = clinic;

  return (
    <div className="clinic-card">
      <div className="clinic-card-image-container">
        <img
          className="clinic-card-image"
          src={image}
          alt="clinic-profile"
        />
      </div>

      <div className="clinic-details">
        <h2 className="clinic-name">{name}</h2>
        <div className="profile-info-container__info__card">
          <ul>
            <li className="clinic-address">
              {address}
            </li>
            <li className="clinic-postalcode">
              {postalCode}
            </li>
          </ul>
        </div>
        <div className="clinic-button-container">
          <Link href="/clinics/[id]" as={`/clinics/${clinic.id}`}>
            <a className="clinic-card-button" href="/clinics/[id]">See more info</a>
          </Link>
        </div>
      </div>

    </div>
  );
};

ClinicCard.propTypes = {
  clinic: PropTypes.instanceOf(Object).isRequired,
};

export default ClinicCard;
