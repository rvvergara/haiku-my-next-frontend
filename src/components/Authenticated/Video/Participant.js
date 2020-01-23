import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';


const Participant = ({ participant, isRemote, anyOther }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [multipleRemoteClass, setMultipleRemoteClass] = useState('');

  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    setVideoTracks(Array.from(participant.videoTracks.values()));
    setAudioTracks(Array.from(participant.audioTracks.values()));

    const trackSubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      audioTrack.mediaStreamTrack.enabled = false;
      // console.log('AUDIO TRACK', audioTrack);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  useEffect(() => {
    if (isRemote) {
      if (anyOther) {
        console.log('HELLO WE ARE BROTHERS', anyOther);
        setMultipleRemoteClass('multiple-remote');
      } else {
        console.log('HELLO I DONT LIKE');
        setMultipleRemoteClass('');
      }
    }
  }, [anyOther]);
  return (
    <div className="participant">
      <h3 className="participant-name">{participant.identity}</h3>
      {
        /*
        if participant is remote and there is another remote participant then we set multipleClass to multiple-class
        */
      }
      <video
        className={`twilio-video ${multipleRemoteClass}`}
        ref={videoRef}
        autoPlay
        controls
      >
        <track src={videoTracks[0]} kind='captions' />
      </video>
      <audio ref={audioRef} autoPlay muted={false}>
        <track src={audioTracks[0]} kind='captions' />
      </audio>
    </div>
  );
};

Participant.propTypes = {
  participant: PropTypes.instanceOf(Object).isRequired,
  isRemote: PropTypes.bool.isRequired,
  anyOther: PropTypes.bool.isRequired,
};

export default Participant;
