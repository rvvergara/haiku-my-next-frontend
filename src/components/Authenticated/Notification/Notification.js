import Dropdown from 'react-bootstrap/Dropdown';

const Notification = ({ notification }) => {
  const NotificationType = actionType => {
    switch (actionType) {
      case 'BOOKED':
        return 'Somebody Booked an appointment with you!';
      case 'CONFIRMED':
        return 'Your appointment has been confirmed!'
        case 'REJECTED':
          return 'Your appointment has been rejected'
      default:
        return '';
    }
  };
  return (
    <Dropdown.Item href="/bookings">
      {NotificationType(notification.actionType)}
    </Dropdown.Item>
  );
};

export default Notification;
