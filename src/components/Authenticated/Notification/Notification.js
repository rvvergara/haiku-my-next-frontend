import { connect } from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const Notification = ({ notifications }) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FaBell />
          <Badge variant="light">9</Badge>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Booking Confirmed!</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Booking Rejected</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notification);
