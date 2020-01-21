import Dropdown from 'react-bootstrap/Dropdown';

const Notification = ({ notification }) => {
  const NotificationType = actionType => {
    switch (actionType) {
      case 'BOOKED':
        return 'Somebody Booked an appointment with you!';
      default:
        return '';
    }
  };
  return (
    <Dropdown.Item href="#/action-1">
      {NotificationType(notification.actionType)}
    </Dropdown.Item>
  );
};

export default Notification;
