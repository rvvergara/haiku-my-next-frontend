import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import Container from 'react-bootstrap/Container';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import VerifyPageHeader from '../components/VisitorContent/VerifyPageHeader';
import { sendRequest } from '../utils/api';
import setError from '../store/actions/error';

const VerifyAccount = ({ result }) => {
  const { status, message, email } = result;
  const handleResendClick = async () => {
    const path = 'v1/resend-verification-email';
    await sendRequest('post', path, { email });
    Router.push('/reverification-sent');
  };
  return (
    <VisitorLayout title='Account Verified'>
      <VerifyPageHeader />
      <Container>
        <div className="verification-message">
          <p>{message}</p>
          {
            status
            ? (
              <Link href='/login'>
                <a
                  className="theme-button verify-login-button"
                  href="/login"
                >
          Login
                </a>
              </Link>
)
          : (
            <button
              type='button'
              className="theme-button verify-login-button"
              onClick={handleResendClick}
            >
            Resend Verification Email
            </button>
          )
        }
        </div>
      </Container>
    </VisitorLayout>
);
};

VerifyAccount.propTypes = {
  result: PropTypes.instanceOf(Object).isRequired,
};

VerifyAccount.getInitialProps = async (ctx) => {
  const { email, token } = ctx.query;
  const path = 'v1/verify';
  let result;
  try {
    await sendRequest('post', path, { email, token });
    result = { status: true, message: 'Congratulations! You are now verified!' };
  } catch (err) {
    ctx.store.dispatch(setError(err.response.data));
    result = { status: false, message: 'Wrong token', email };
  }
  return { result };
};

export default connect((state) => state)(VerifyAccount);
