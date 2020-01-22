import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Video from 'twilio-video';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Participant from './Participant';

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };

    Video.connect(token, {
      name: roomName,
      // logLevel: 'debug',
    }).then((room) => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    }).catch(() => setHasError(true));

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.disconnect();
          return null;
        }
          return currentRoom;
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  const handleClose = () => setHasError(false);

  return (
    <div className="room">
      <Modal show={hasError}>
        <Modal.Header>
          Device Not Found
        </Modal.Header>
        <Modal.Body>
          No camera found
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
          Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h2>
        Room:
        {' '}
        {roomName}
      </h2>
      <button
        type='button'
        onClick={handleLogout}
      >
        Leave Room
      </button>
      <div className="participants-box">
        <div className="local-participant">
          {room ? (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          ) : (
            ''
          )}
        </div>
        <div className="remote-participants">{remoteParticipants}</div>
      </div>
    </div>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Room;
