import React from 'react';
import PropTypes from 'prop-types';

const Lobby = ({
  roomName,
  handleSubmit,
}) => (
  <div>
    <h3>
Call Title:
      {' '}
      {roomName}
    </h3>
    <button
      type='button'
      onClick={handleSubmit}
    >
        Return to Call
    </button>
  </div>
  );

Lobby.propTypes = {
  roomName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Lobby;
