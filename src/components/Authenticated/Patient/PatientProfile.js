import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';

const PatientProfile = () => (
  <div className="profile">
    <ProfileInfoGroup infoKey="Name" val="John Doe" />
    <ProfileInfoGroup infoKey="ID/Passport" val="123456" />
    <ProfileInfoGroup infoKey="Contact Number" val="855-0772" />
    <ProfileInfoGroup infoKey="Address" val="25th High Street" />
    <ProfileInfoGroup infoKey="Remarks" val="I wanna be very healthy." />
  </div>
);

export default PatientProfile;
