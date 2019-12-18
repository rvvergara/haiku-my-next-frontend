import Link from 'next/link';

const VisitorHeader = () => (
  <header className="visitor-header">
    <div className="container">
      <div className="authentication-group">
        <Link href="/login">
          <button
            type="button"
            className="authentication"
            onClick={() => localStorage.clear()}
          >
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button
            type="button"
            className="authentication"
            onClick={() => localStorage.clear()}
          >
            Signup
          </button>
        </Link>
      </div>
    </div>
  </header>
);

export default VisitorHeader;
