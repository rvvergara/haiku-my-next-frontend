import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Layout from '../components/Layouts/Layout';
import VideoComponent from '../components/Authenticated/VideoComponent';

const VideoPage = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Layout title='Video'>
      <VideoComponent />
    </Layout>
  </MuiThemeProvider>
);

export default VideoPage;
