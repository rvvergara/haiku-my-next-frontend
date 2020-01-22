import decode from 'jwt-decode';
import moment from 'moment';
import PropTypes from 'prop-types';
import VideoChat from '../components/Authenticated/Video/VideoChat';
import Layout from '../components/Layouts/Layout';
import { fetchOneAvailability } from '../store/thunks/availability';

const VideoPage = ({ roomName, expired }) => (
  <Layout title="Video">
    {/* expired
      ? <div><h1>Token invalid or call finished</h1></div>
    : <VideoChat roomName={roomName} /> */}
    <VideoChat roomName={roomName} />
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
    const stringedBookingSlotEnd = new Date(`${bookingSlot.date} ${bookingSlot.endTime}`);
    const expired = moment(stringedBookingSlotEnd) < moment();
    return {
      roomName,
      expired,
    };
  } catch (err) {
    return {
      roomName: '',
      expired: true,
    };
  }
};

VideoPage.propTypes = {
  roomName: PropTypes.string.isRequired,
  expired: PropTypes.bool.isRequired,
};

export default VideoPage;
