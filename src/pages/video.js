import PropTypes from 'prop-types';
import VideoChat from '../components/Authenticated/Video/VideoChat';
import Layout from '../components/Layouts/Layout';

const VideoPage = ({ username, roomName }) => (
  <Layout title="Video">
    <h1>Hello</h1>
    <VideoChat username={username} roomName={roomName} />
  </Layout>
);

VideoPage.getInitialProps = (ctx) => ({
  username: ctx.query.username,
  roomName: ctx.query.roomName,
});

VideoPage.propTypes = {
  username: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
};

export default VideoPage;
