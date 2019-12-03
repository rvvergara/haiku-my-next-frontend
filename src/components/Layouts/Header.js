const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__brand">
        <h1>
          Igaku Logo Here
        </h1>
      </div>
      <div className="header__links">
        <div className="header__links__welcome">
          <strong>Welcome User</strong>
        </div>
        <div className="header__links__logout">
          <button
            type="button"
            className="logout"
            onClick={() => console.log('Logged out now')}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
  );

export default Header;
