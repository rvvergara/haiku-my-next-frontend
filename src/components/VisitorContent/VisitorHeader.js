import Link from 'next/link';

const VisitorHeader = () => (
  <header className="visitor-header">
    <div className="container">
      <div className="authentication-group">
        <Link href="/login">
          <button
            type="button"
            className="authentication"
          >
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button
            type="button"
            className="authentication"
          >
            Signup
          </button>
        </Link>
      </div>
    </div>
  </header>
);

export default VisitorHeader;
