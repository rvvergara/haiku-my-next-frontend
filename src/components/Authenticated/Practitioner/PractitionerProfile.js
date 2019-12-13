import PractitionerCard from './PractitionerCard';
import PractitionerDetailsCard from './PractitionerDetailsCard';
import Booking from '../Booking/Booking';


const PractitionerProfile = () => (
  <div className="profile">
    <div>
      <PractitionerCard />
      <PractitionerDetailsCard />
    </div>

    <Booking />
  </div>
);

export default PractitionerProfile;
