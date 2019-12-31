import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import {
 FaClinicMedical, FaCalendarAlt,
} from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { GoPerson } from 'react-icons/go';
import { MdSchedule } from 'react-icons/md';

const PractitionerNavLinks = () => (
  <>
    <Link href='/profile/edit'>
      <Nav.Link href='/profile/edit' className='header-navlinks'>
        <GoPerson className='nav-icons' />
        <span className='header-navlinks-text'>Profile</span>
      </Nav.Link>
    </Link>
    <Link href='/schedule'>
      <Nav.Link href='/schedule' className='header-navlinks'>
        <FaCalendarAlt className='nav-icons' />
        <span className='header-navlinks-text'>Schedule</span>
      </Nav.Link>
    </Link>
    <Link href='/bookings'>
      <Nav.Link href='/bookings' className='header-navlinks'>
        <MdSchedule className='nav-icons' />
        <span className='header-navlinks-text'>Bookings</span>
      </Nav.Link>
    </Link>
    <Link href='/patients'>
      <Nav.Link href='/patients' className='header-navlinks'>
        <GiHealthNormal className='nav-icons' />
        <span className='header-navlinks-text'>Patients</span>
      </Nav.Link>
    </Link>
    <Link href='/clinics'>
      <Nav.Link href='/clinics' className='header-navlinks'>
        <FaClinicMedical className='nav-icons' />
        <span className='header-navlinks-text'>Clinics</span>
      </Nav.Link>
    </Link>
  </>
);

export default PractitionerNavLinks;
