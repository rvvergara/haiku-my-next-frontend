import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { FaClinicMedical, FaSearch, FaGift } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { MdSchedule } from 'react-icons/md';

const PatientNavLinks = () => (
  <>
    <Link href='/profile/edit'>
      <Nav.Link href='/profile/edit' className='header-navlinks'>
        <GoPerson className='nav-icons' />
        <span className='header-navlinks-text'>Profile</span>
      </Nav.Link>
    </Link>
    <Link href='/clinics'>
      <Nav.Link href='/clinics' className='header-navlinks'>
        <FaClinicMedical className='nav-icons' />
        <span className='header-navlinks-text'>Clinics</span>
      </Nav.Link>
    </Link>
    <Link href='/bookings'>
      <Nav.Link href='/bookings' className='header-navlinks'>
        <MdSchedule className='nav-icons' />
        <span className='header-navlinks-text'>Bookings</span>
      </Nav.Link>
    </Link>
    <Link href='/rewards'>
      <Nav.Link href='/rewards' className='header-navlinks'>
        <FaGift className='nav-icons' />
        <span className='header-navlinks-text'>Rewards</span>
      </Nav.Link>
    </Link>
    <Link href='/search'>
      <Nav.Link href='/search' className='header-navlinks'>
        <FaSearch className='nav-icons' />
        <span className='header-navlinks-text'>Search</span>
      </Nav.Link>
    </Link>
  </>
);

export default PatientNavLinks;
