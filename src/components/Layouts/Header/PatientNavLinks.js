import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';

const PatientNavLinks = () => (
  <>
    <Link href='/profile/edit'>
      <Nav.Link href='/profile/edit'>
        My Profile
      </Nav.Link>
    </Link>
    <Link href='/clinics'>
      <Nav.Link href='/clinics'>
        Clinics
      </Nav.Link>
    </Link>
    <Link href='/search'>
      <Nav.Link href='/search'>
        Search
      </Nav.Link>
    </Link>
    <Link href='/bookings'>
      <Nav.Link href='/bookings'>
        My Bookings
      </Nav.Link>
    </Link>
    <Link href='/rewards'>
      <Nav.Link href='/rewards'>
      My Rewards
      </Nav.Link>
    </Link>
  </>
);

export default PatientNavLinks;
