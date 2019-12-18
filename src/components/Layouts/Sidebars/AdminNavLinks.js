import Link from 'next/link';

const AdminNavLinks = () => (
  <ul className="sidebar__nav">
    <li className="sidebar__navlink">
      <Link href="/">
        <a href="/">My Clinic</a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <Link href="/clinic/doctors">
        <a href="/clinic/doctors">Doctors</a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <Link href="/clinic/bookings">
        <a href="/clinic/bookings">Bookings</a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <Link href="/clinic/patients">
        <a href="/clinic/patients">Patients</a>
      </Link>
    </li>
  </ul>
);

export default AdminNavLinks;
