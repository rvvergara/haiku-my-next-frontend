import PropTypes from 'prop-types';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';

const Notification = ({ notification }) => {
  let action;
  let actor;
  let link;
  switch (notification.actionType) {
    case 'BOOKED':
      {
        const fullName = `${notification.patientActor.firstName} ${notification.patientActor.lastName}`;
        action = `${fullName} booked an appointment with you.`;
        actor = notification.patientActor;
        link = '/bookings';
      }
      break;
    case 'CONFIRMED':
      {
        const fullName = `Dr. ${notification.practitionerActor.firstName} ${notification.practitionerActor.lastName}`;
        action = `${fullName} accepted your appointment request.`;
        actor = fullName;
        link = '/bookings';
      }
      break;
      case 'REJECTED':
        {
          const fullName = `Dr. ${notification.practitionerActor.firstName} ${notification.practitionerActor.lastName}`;
          action = `${fullName} rejected your appointment request.`;
          actor = notification.practitionerActor;
          link = '/bookings';
      }
        break;
    default:
      return '';
  }
  return (
    <Link href={link}>
      <Dropdown.Item href={link}>
        <p>{`${action}`}</p>
      </Dropdown.Item>
    </Link>
  );
};

Notification.propTypes = {
  notification: PropTypes.instanceOf(Object).isRequired,
};
export default Notification;
