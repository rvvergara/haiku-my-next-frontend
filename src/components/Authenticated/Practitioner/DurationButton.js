import PropTypes from 'prop-types';

const DurationButton = ({ value, isActive, onClick }) => {
  const handleClick = () => onClick(value);

  return (
    <button
      type="button"
      className={
        isActive ? 'selected-duration booking-duration' : 'booking-duration'
      }
      onClick={() => handleClick(value)}
    >
      {`${value} minutes`}
    </button>
  );
};

DurationButton.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DurationButton;
