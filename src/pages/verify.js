import Container from 'react-bootstrap/Container';
import VisitorLayout from '../components/VisitorContent/VisitorLayout';
import VerifyPageHeader from '../components/VisitorContent/VerifyPageHeader';

const VerifyPage = () => (
  <VisitorLayout title='Account Created'>
    <VerifyPageHeader />
    <Container>
      <div className='verification-message'>
        <p>
          Account successfully created.
        </p>
        <p>
          Please confirm your email by clicking on the verification link sent to your email address.
        </p>
      </div>
    </Container>
  </VisitorLayout>
);

export default VerifyPage;
