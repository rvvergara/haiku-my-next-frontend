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

  const defaultPic = 'https://i.imgur.com/GJxJnJ1.png';

  return (
    <div className="practitionerBox-container">
      <div className="practitionerBox-image-container">
        <img
          className="practitionerBox-image"
          src={image || defaultPic}
          alt="doctor-profile"
        />
      </div>
      <div className="practitionerBox-info">
        <p className="practitioner-name">{`${firstName} ${lastName}`}</p>
        <p className="grotesque-font practitionerBox-specialties">{specialties.replace(/[\[\]"]+/g, '')}</p>
        <p className="grotesque-font practitionerBox-bio">
          {biography.substring(0, 100)}
          ...
        </p>
        <div>
          <Link href="/practitioners/[id]" as={`/practitioners/${id}`}>
            <a className="practitionerBox-button" href="/practitioner/[id]">
              View Doctor Profile
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

PractitionerBox.propTypes = {
  practitioner: PropTypes.instanceOf(Object).isRequired,
};

export default PractitionerBox;
