import Link from 'next/link';

const PractitionerNavLinks = () => (
  <ul className="sidebar__nav">
    <li className="sidebar__navlink">
      <Link href="/profile/edit">
        <button type="button">
          My Profile
        </button>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <button type="button">
        My Schedule
      </button>
    </li>
    <li className="sidebar__navlink">
      <button type="button">
        Bookings
      </button>
    </li>
    <li className="sidebar__navlink">
      <button type="button">
        My Patients
      </button>
    </li>
  </ul>
);

export default PractitionerNavLinks;
