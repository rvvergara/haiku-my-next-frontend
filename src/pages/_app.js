import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import decode from 'jwt-decode';
import initializeStore from '../store/initializeStore';
import { setCurrentUser, asyncFetchCurrentUserData } from '../store/actions/currentUser';
import { setAuthorizationToken } from '../utils/api';

class IgakuApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { store, req } = ctx;
    if (req) {
      try {
        const { cookie } = req.headers;
        const token = cookie.split('=')[1];
        const id = decode(token).user_id;
        store.dispatch(asyncFetchCurrentUserData(id));
        setAuthorizationToken(token);
      } catch (err) {
        store.dispatch(setCurrentUser({ authenticated: false, data: {} }));
      }
    }
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

export default withRedux(initializeStore)(IgakuApp);
