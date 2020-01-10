import Link from 'next/link';
import PropTypes from 'prop-types';
import { IoMdPricetags } from 'react-icons/io';
import { withTranslation } from '../../../../i18n';

const PractitionerBox = ({ practitioner, t }) => {
  const {
    yearsOfExperience,
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
        <p className="grotesque-font practitionerBox-specialties">
          {specialties.replace(/[\[\]"]+/g, '')}
        </p>
        <p className="practitionerBox-exp">
          {`${yearsOfExperience} ${t('yearsOfExp')}`}
        </p>
      </div>
      <div>
        <div className="quote">
          <IoMdPricetags className="quote-icon" />
          <p className="quote-value">$50</p>
        </div>
        <Link href="/practitioners/[id]" as={`/practitioners/${id}`}>
          <a className="practitionerBox-button" href="/practitioner/[id]">
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

export default withTranslation('practitionerBox')(PractitionerBox);
