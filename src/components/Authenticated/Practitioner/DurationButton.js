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

export default DurationButton;
