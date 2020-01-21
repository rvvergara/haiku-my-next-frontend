import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { FaClinicMedical, FaGift } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { MdFeedback, MdSchedule } from 'react-icons/md';
import { withTranslation } from '../../../../i18n';
import Notification from '../../Authenticated/Notification/Notification';

const PatientNavLinks = ({ t }) => (
  <>
    <Link href="/account/edit">
      <Nav.Link href="/account/edit" className="header-navlinks">
        <GoPerson className="nav-icons" />
        <span className="header-navlinks-text">{t('settings')}</span>
      </Nav.Link>
    </Link>
    <Link href="/profile/edit">
      <Nav.Link href="/profile/edit" className="header-navlinks">
        <GoPerson className="nav-icons" />
        <span className="header-navlinks-text">{t('profile')}</span>
      </Nav.Link>
    </Link>
    <Link href="/practitioners">
      <Nav.Link href="/practitioners" className="header-navlinks">
        <FaClinicMedical className="nav-icons" />
        <span className="header-navlinks-text">{t('practitioners')}</span>
      </Nav.Link>
    </Link>
    <Link href="/bookings">
      <Nav.Link href="/bookings" className="header-navlinks">
        <MdSchedule className="nav-icons" />
        <span className="header-navlinks-text">{t('bookings')}</span>
      </Nav.Link>
    </Link>
    <Link href="/rewards">
      <Nav.Link href="/rewards" className="header-navlinks">
        <FaGift className="nav-icons" />
        <span className="header-navlinks-text">{t('reward')}</span>
      </Nav.Link>
    </Link>
    <Link href="/feedback">
      <Nav.Link href="/feedback" className="header-navlinks prominent">
        <MdFeedback className="nav-icons" />
        <span className="header-navlinks-text">{t('feedback')}</span>
      </Nav.Link>
    </Link>
    <Notification />
    {/* <Link href='/search'>
      <Nav.Link href='/search' className='header-navlinks'>
        <FaSearch className='nav-icons' />
        <span className='header-navlinks-text'>Search</span>
      </Nav.Link>
    </Link> */}
  </>
);

export default withTranslation('patientNavLink')(PatientNavLinks);
