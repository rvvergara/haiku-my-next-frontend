import SignupForm from '../components/SignupForm';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';

const SignupPage = () => (
  <VisitorLayout title="Create Account">
    <div className="signup__container">
      <div className="login-box">
        <div className="auth-logo">
          <img
            src="https://tinyimg.io/i/uS2trrA.png"
            alt="Igaku | Health That Cares"
            className="login-logo"
          />
        </div>
        <SignupForm />
      </div>
    </div>
  </VisitorLayout>
);

export default SignupPage;
