import Link from "next/link";

const AdminNavLinks = () => (
  <ul className="sidebar__nav">
    <li className="sidebar__navlink">
      <Link href="/">
        <a href="/">My Clinic</a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <Link href="/clinic/doctors">
        <a>Doctors</a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <Link href="/clinic/bookings">
        <a>Bookings</a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <Link href="/clinic/patients">
        <a>Patients</a>
      </Link>
    </li>
  </ul>
);

export default AdminNavLinks;
