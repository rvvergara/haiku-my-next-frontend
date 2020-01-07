import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import 'react-dates/lib/css/_datepicker.css';
import { Provider } from 'react-redux';
import { appWithTranslation } from '../../i18n';
import '../scss/main.scss';
import initializeStore from '../store/initializeStore';
import initialize from '../utils/initialize';

class IgakuApp extends App {
  static async getInitialProps({ Component, ctx }) {
    await initialize(ctx);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(appWithTranslation(IgakuApp));
// export default appWithTranslation(withRedux(initializeStore)(IgakuApp));
