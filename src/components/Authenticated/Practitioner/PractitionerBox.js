import Link from 'next/link';
import PropTypes from 'prop-types';

const PractitionerBox = ({ practitioner }) => {
  const {
 biography, specialities, id, image,
} = practitioner;

  return (
    <div className="practitionerBox-container">
      <div className="practitioner-info-container">
        <img
          className="profile-image__avatar"
          src={image || 'https://images1-fabric.practo.com/dr-goh-min-yih-peter-1454317839-56af210f55ab0.jpg/thumbnail'}
          alt="doctor-profile"
        />
        <div className="practitioner-profile-info">
          <p className="practitioner-name">Dr. Peter Goh Min Yih.</p>
          <p className="specialties">{specialities}</p>
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
