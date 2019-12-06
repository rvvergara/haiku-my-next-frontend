import LoginForm from '../components/LoginForm';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';

const LoginPage = () => (
  <VisitorLayout title="Login">
    <div className="container auth__container">
      <div className="auth-box">
        <div className="auth-logo">
          <img
            src="https://tinyimg.io/i/uS2trrA.png"
            alt="Igaku | Health That Cares"
            className="auth-logo__img"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  </VisitorLayout>
);

export default LoginPage;
