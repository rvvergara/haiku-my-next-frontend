import SignupForm from '../components/SignupForm';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';

const SignupPage = () => (
  <VisitorLayout title="Create Account">
    <h1>Signup Here</h1>
    <SignupForm />
  </VisitorLayout>
);

export default SignupPage;
