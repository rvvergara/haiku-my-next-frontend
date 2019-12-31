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
      <div className="profile-info-container">
        <img
          className="practitionerBox-image"
          src={image}
          alt="doctor-profile"
        />
        <div className="">
          <p className="practitioner-name">{`${firstName} ${lastName}`}</p>
          <p className="specialties">{specialties.replace(/[\[\]"]+/g, '')}</p>
          <p className="grotesque-font profile-info-container__info__card__conten">
            {biography.substring(0, 100)}
            ...
          </p>
        </div>
      </div>
      <div>
        <Link href="/practitioners/[id]" as={`/practitioners/${id}`}>
          <a className="practitionerbox-profile-button" href="/practitioner/[id]">
            View Doctor Profile
          </a>
        </Link>
      </div>
    </div>
  );
};

PractitionerBox.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
};

export default PractitionerBox;
