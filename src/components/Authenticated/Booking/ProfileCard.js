const ProfileCard = ({ profile }) => (
  <div>
    <img src={profile.image} width='100' />
    <p>{`${profile.firstName} ${profile.lastName}`}</p>
  </div>
);

export default ProfileCard;
