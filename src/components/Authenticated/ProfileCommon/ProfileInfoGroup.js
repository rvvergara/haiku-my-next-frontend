import PropTypes from 'prop-types';

const ProfileInfoGroup = ({ infoKey, val }) => (
  <div className="profile__info__group">
    <p className="profile__info__key">
      {infoKey}
      :
    </p>
    <p className="profile__info__value">{val}</p>
  </div>
);

ProfileInfoGroup.propTypes = {
  infoKey: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
};

export default ProfileInfoGroup;
