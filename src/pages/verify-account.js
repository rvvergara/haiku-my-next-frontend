import { connect } from 'react-redux';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import VerifyPageHeader from '../components/VisitorContent/VerifyPageHeader';
import { sendRequest } from '../utils/api';
import setError from '../store/actions/error';

const VerifyAccount = () => (
  <VisitorLayout title='Account Verified'>
    <VerifyPageHeader />
    <Container>
      <div className="verification-message">
        <p>Congratulations! You are now verified. You may now log in</p>
        <Link href='/login'>
          <a
            className="theme-button verify-login-button"
            href="/login"
          >
          Login
          </a>
        </Link>
      </div>
    </Container>
  </VisitorLayout>
);

VerifyAccount.getInitialProps = async (ctx) => {
  const { email, token } = ctx.query;
  const path = 'v1/verify';
  try {
    await sendRequest('post', path, { email, token });
  } catch (err) {
    ctx.store.dispatch(setError(err));
  }
};

export default connect((state) => state)(VerifyAccount);
