const Header = () => (
  <header className="header">
    <div className="header__brand">
      <h1>
        Igaku Logo Here
      </h1>
    </div>
    <div className="header__links">
      <div className="header__links__welcome">
        Welcome User
      </div>
      <div className="header__links__logout">
        <button
          type="button"
          onClick={() => console.log('Logged out now')}
        >
          Logout
        </button>
      </div>
    </div>
  </header>
  );

export default Header;
