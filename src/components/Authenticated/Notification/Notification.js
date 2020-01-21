import Dropdown from 'react-bootstrap/Dropdown';

const Notification = ({ notification }) => (
  <Dropdown.Item href="#/action-1">
    { notification.actionType }
  </Dropdown.Item>
);

export default Notification;