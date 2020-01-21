import { connect } from 'react-redux';
import { Badge, Dropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const Notification = ({ notifications }) => (
  <div>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <FaBell />
        <Badge variant="light">9</Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          notifications.map((notification) => (
            <Dropdown.Item href="#/action-1">{notification.actionType}</Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  </div>
  );

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notification);
