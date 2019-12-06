import Link from 'next/link';

const PatientNavLinks = () => (
  <ul className="sidebar__nav">
    <li className="sidebar__navlink">
      <Link href="/profile/edit">
        <a href="/profile/edit" className="nav-link">
          My Profile
        </a>
      </Link>
    </li>
    <li className="sidebar__navlink">
      <button type="button">
        Search
      </button>
    </li>
    <li className="sidebar__navlink">
      <button type="button">
        My bookings
      </button>
    </li>
    <li className="sidebar__navlink">
      <button type="button">
        My rewards
      </button>
    </li>
  </ul>
);

export default PatientNavLinks;
