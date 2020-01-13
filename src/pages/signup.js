import Link from 'next/link';
import SignupForm from '../components/SignupForm';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import { withTranslation } from '../../i18n';

const SignupPage = () => (
  <VisitorLayout title="Create Account">
    <div className="signup__container">
      <div className="login-box">
        <div className="auth-logo">
          <Link href="/">
            <img
              src="https://tinyimg.io/i/uS2trrA.png"
              alt="Igaku | Health That Cares"
              className="login-logo"
            />
          </Link>
        </div>
        <SignupForm route='/signup' />
      </div>
    </div>
  </VisitorLayout>
);

SignupPage.getInitialProps = () => ({
  namespacesRequired: ['signup'],
});

export default withTranslation('signup')(SignupPage);
