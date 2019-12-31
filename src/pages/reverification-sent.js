import Container from 'react-bootstrap/Container';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import VerifyPageHeader from '../components/VisitorContent/VerifyPageHeader';

const Reverification = () => (
  <VisitorLayout title='Verification Email Sent'>
    <VerifyPageHeader />
    <Container>
      <div className="verification-message">
        <p>Verification Email Sent</p>
        <p>Please check your email and click on the link provided to activate your account.</p>
      </div>
    </Container>
  </VisitorLayout>
);

export default Reverification;
