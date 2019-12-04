import ProfileInfoGroup from '../ProfileCommon/ProfileInfoGroup';

const PractitionerProfile = () => (
  <div className="profile">
    <ProfileInfoGroup infoKey="Name" val="Dr. Frankenstein" />
    <ProfileInfoGroup infoKey="Clinic" val="Health Clinic" />
    <ProfileInfoGroup infoKey="Education" val="University, Veterinary Medicine, Clinical Psychology" />
    <ProfileInfoGroup infoKey="Specialization" val="Neurology, Orthopaedics" />
    <ProfileInfoGroup infoKey="Years of Experience" val="23" />
    <ProfileInfoGroup infoKey="Description" val="I am a cool doctor." />
  </div>
);

export default PractitionerProfile;
