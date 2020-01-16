import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = ({ username, roomName, expired }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('/video/token', {
          identity: username,
          room: roomName
        });
        const { data } = res;
        setToken(data.token);
      } catch (err) {
        console.log('ERROR', err);
      }
    })();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const res = await axios.post('/video/token', {
        identity: username,
        room: roomName
      });
      const { data } = res;
      setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  if (!expired) {
    return token ? (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    ) : (
      <Lobby roomName={roomName} handleSubmit={handleSubmit} />
    );
  }
  return (
    <div>
      <h1>Call has ended</h1>
    </div>
  );
};

VideoChat.propTypes = {
  username: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  expired: PropTypes.bool.isRequired
};

export default VideoChat;
