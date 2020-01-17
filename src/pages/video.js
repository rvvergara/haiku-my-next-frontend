import decode from 'jwt-decode';
import moment from 'moment';
import PropTypes from 'prop-types';
import VideoChat from '../components/Authenticated/Video/VideoChat';
import Layout from '../components/Layouts/Layout';
import { fetchOneAvailability } from '../store/thunks/availability';

const VideoPage = ({ roomName }) => (
  <Layout title="Video">
    <VideoChat
      roomName={roomName}
    />
  </Layout>
);

VideoPage.getInitialProps = async (ctx) => {
  const { query, store } = ctx;
  const { token } = query;
  const { dispatch, getState } = store;
  try {
    const decoded = decode(token);
    const { slotId, roomName } = decoded;
    await dispatch(fetchOneAvailability(slotId));
    const bookingSlot = getState().displayedAvailability;
    return {
      roomName,
    };
  } catch (err) {
    return {
      roomName: '',
    };
  }
};

VideoPage.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default VideoPage;
