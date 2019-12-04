import Link from 'next/link';

const VisitorHeader = () => (
  <header className="visitor-header">
    <Link href="/login">
      <button
        type="button"
        className="authentication"
      >
        Login
      </button>
    </Link>
  </header>
);

export default VisitorHeader;
