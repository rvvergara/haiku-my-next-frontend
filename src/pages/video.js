import decode from 'jwt-decode';
import PropTypes from 'prop-types';
import VideoChat from '../components/Authenticated/Video/VideoChat';
import Layout from '../components/Layouts/Layout';
import { checkIfTokenExp } from '../utils/initializeHelpers';

const VideoPage = ({ username, roomName, expired }) => (
  <Layout title="Video">
    <VideoChat
      username={username}
      roomName={roomName}
      expired={expired}
    />
  </Layout>
);

VideoPage.getInitialProps = (ctx) => {
  const { query } = ctx;
  const { token } = query;
  try {
    const decoded = decode(token);
  const { username, roomName } = decoded;
  const expired = checkIfTokenExp(decoded);
  return {
    username,
    roomName,
    expired,
  };
  } catch (err) {
    return {
      username: '',
      roomName: '',
      expired: true,
    };
  }
};

VideoPage.propTypes = {
  username: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  expired: PropTypes.bool.isRequired,
};

export default VideoPage;
