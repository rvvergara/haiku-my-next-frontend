import { connect } from 'react-redux';
import Link from 'next/link';
import { sendRequest } from '../utils/api';
import setError from '../store/actions/error';

const VerifyAccount = () => (
  <div>
    <p>Congratulations! You are now verified. You may now log in</p>
    <Link href='/login'>
      <a href="/login">Link To Login</a>
    </Link>
  </div>
);

VerifyAccount.getInitialProps = async (ctx) => {
  const { email, token } = ctx.query;
  const path = `v1/verify?email=${email}&token=${token}`;
  try {
    await sendRequest('get', path);
  } catch (err) {
    ctx.store.dispatch(setError(err));
  }
};

export default connect((state) => state)(VerifyAccount);
