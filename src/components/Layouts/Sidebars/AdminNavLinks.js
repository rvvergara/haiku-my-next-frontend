const AdminNavLinks = () => (
    <ul className="sidebar__nav">
      <li className="sidebar__navlink">
        <button type="button">
          <a href="/">My Clinic</a>
        </button>
      </li>
      <li className="sidebar__navlink">
        <button type="button">
          <a href="/clinic/doctors">Doctors</a>
        </button>
      </li>
      <li className="sidebar__navlink">
        <button type="button">
          <a href="/clinic/bookings">Bookings</a>
        </button>
      </li>
      <li className="sidebar__navlink">
        <button type="button">
          <a href="/clinic/patients">Patients</a>
        </button>
      </li>
    </ul>
  );
  
  export default AdminNavLinks;
  