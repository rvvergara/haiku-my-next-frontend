import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import LoginForm from '../components/LoginForm';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';

const LoginPage = () => (
  <VisitorLayout title="Login">
    <div className="auth__container">
      <Col className="auth-box">
        <div className="auth-logo">
          <Link href="/">
            <img
              src="https://tinyimg.io/i/uS2trrA.png"
              alt="Igaku | Health That Cares"
              className="login-logo"
            />
          </Link>
        </div>
        <LoginForm />
      </Col>
    </div>
  </VisitorLayout>
);

export default LoginPage;
