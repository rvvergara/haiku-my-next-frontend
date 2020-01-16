import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = ({ username, roomName }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('/video/token', { identity: username, room: roomName });
        const { data } = res;
        setToken(data.token);
      } catch (err) {
        console.log('ERROR', err);
      }
    })();
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await axios.post('/video/token', { identity: username, room: roomName });
      const { data } = res;
      setToken(data.token);
    },
    [roomName, username],
  );

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        roomName={roomName}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
