import PropTypes from 'prop-types';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';

const Notification = ({ notification }) => {
  let action;
  let actor;
  let link;
  switch (notification.actionType) {
    case 'BOOKED':
      action = 'booked an appointment with you.';
      actor = notification.notifiable.patientId;
      link = '/bookings';
      break;
    case 'CONFIRMED':
      action = 'accepted your appointment request.';
      actor = notification.notifiable.practitionerId;
      link = `/video?token=${notification.notifiable.callToken}`;
      break;
      case 'REJECTED':
        action = 'rejected your appointment request.';
        actor = notification.notifiable.practitionerId;
        link = '/bookings';
        break;
    default:
      return '';
  }
  return (
    <Link href={link}>
      <Dropdown.Item href={link}>
        {`${actor} ${action}`}
      </Dropdown.Item>
    </Link>
  );
};

Notification.propTypes = {
  notification: PropTypes.instanceOf(Object).isRequired,
};
export default Notification;
