import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Video from 'twilio-video';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Participant from './Participant';

// if (process.browser) {
//   navigator.mediaDevices.enumerateDevices().then((devices) => {
//     const audioInput = devices.find((device) => device.kind === 'audioinput');
//     return Video.createLocalTracks({ audio: { deviceId: audioInput.deviceId }, video: false });
//   }).then();
// }

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

    // LET US TRY THIS
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioInput = devices.find((device) => device.kind === 'audioinput');
      return Video.createLocalTracks({ audio: { deviceId: audioInput.deviceId }, video: false });
    }).then((localTracks) => Video.connect(token, {
        name: roomName,
        logLevel: 'debug',
        tracks: localTracks,
      }).then((room) => {
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);
      }).catch(() => setHasError(true)));
      // END OF CODE TO TRY

    // Video.connect(token, {
    //   name: roomName,
    //   logLevel: 'debug',
    // }).then((room) => {
    //   setRoom(room);
    //   room.on('participantConnected', participantConnected);
    //   room.on('participantDisconnected', participantDisconnected);
    //   room.participants.forEach(participantConnected);
    // }).catch(() => setHasError(true));

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
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Room;
