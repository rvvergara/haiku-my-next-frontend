import { connect } from 'react-redux';
import { Badge, Dropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import Notification from './Notification';

const NotificationList = ({ notifications }) => (
  <div>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <FaBell />
        <Badge variant="light">{notifications.length}</Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
            />
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  </div>
  );

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(NotificationList);
