import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Intro = () => (
  <Container fluid>
    <Row>
      <Col className="mobile-container">
        <div className="intro-content">
          <h2 className="intro-content-title">
            <img
              className='intro-content-logo'
              src='./static/igaku_logo_side_by_side.png'
              alt="Igaku Logo With Text"
            />
          </h2>
          <h3 className="intro-content-subtitle">Health That Cares</h3>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Intro;
