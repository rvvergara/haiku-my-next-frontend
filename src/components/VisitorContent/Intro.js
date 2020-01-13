import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { withTranslation } from '../../../i18n';
import SignupForm from '../SignupForm';

const Intro = ({ t }) => (
  <Container fluid>
    <Row>
      <Col className="mobile-container">
        <div className="intro-content">
          <div className="signup-container">
            <SignupForm />
          </div>
          <h2 className="intro-content-title">
            {/* <img
              className="intro-content-logo"
              src="./static/igaku_logo_side_by_side.png"
              alt="Igaku Logo With Text"
            /> */}
          </h2>
          {/* <h3 className="intro-content-subtitle">{t('visitorIntro')}</h3> */}
        </div>
      </Col>
    </Row>
  </Container>
);

export default withTranslation('index')(Intro);
