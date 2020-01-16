import decode from 'jwt-decode';
import PropTypes from 'prop-types';
import VideoChat from '../components/Authenticated/Video/VideoChat';
import Layout from '../components/Layouts/Layout';
import { checkIfTokenExp } from '../utils/initializeHelpers';

const VideoPage = ({ username, roomName, expired }) => (
  <Layout title="Video">
    <h1>Hello</h1>
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
  const decoded = decode(token);
  const { username, roomName } = decoded;
  const expired = checkIfTokenExp(decoded);
  return {
    username,
    roomName,
    expired,
  };
};

VideoPage.propTypes = {
  username: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
};

export default VideoPage;
