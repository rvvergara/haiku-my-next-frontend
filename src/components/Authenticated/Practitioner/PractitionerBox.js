import Link from 'next/link';
import PropTypes from 'prop-types';

const PractitionerBox = ({ practitioner }) => {
  const {
    biography,
    specialties,
    id,
    image,
    firstName,
    lastName,
  } = practitioner;

  return (
    <div className="practitionerBox-container">
      <div className="practitioner-info-container">
        <img className="practitioner-image" src={image} alt="doctor-profile" />
        <div className="practitioner-profile-info">
          <p className="practitioner-name">{`${firstName} ${lastName}`}</p>
          <p className="specialties">{specialties.replace(/[\[\]"]+/g, '')}</p>
          <p className="grotesque-font profile-info-container__info__card__conten">
            {biography.substring(0, 100)}
            ...
          </p>
        </div>
      </div>

      <Link href="/practitioners/[id]" as={`/practitioners/${id}`}>
        <a className="clinic-button" href="/practitioner/[id]">
          Book an Appointment
        </a>
      </Link>
    </div>
  );
};

PractitionerBox.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
};

export default PractitionerBox;
