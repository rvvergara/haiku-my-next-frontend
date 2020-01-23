import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = ({ roomName, profile }) => {
  const [token, setToken] = useState(null);
  const fullName = `${profile.firstName} ${profile.lastName}`;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('/video/token', {
          identity: fullName,
          room: roomName,
        });
        const { data } = res;
        setToken(data.token);
      } catch (err) {
        return err;
      }
    })();
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await axios.post('/video/token', {
        identity: fullName,
        room: roomName,
      });
      const { data } = res;
      setToken(data.token);
    },
    [roomName, fullName],
  );

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  return token ? (
    <Room roomName={roomName} token={token} handleLogout={handleLogout} />
  ) : (
    <Lobby roomName={roomName} handleSubmit={handleSubmit} />
  );
};

const mapStateToProps = (state) => ({
  profile: state.currentUser.data.patient || state.currentUser.data.practitioner,
  bookingSlot: state.bookingSlot,
});

VideoChat.propTypes = {
  roomName: PropTypes.string.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(VideoChat);
