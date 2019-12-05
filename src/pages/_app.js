import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import redirect from 'next-redirect';
import 'react-dates/lib/css/_datepicker.css';
import initializeStore from '../store/initializeStore';
import initialize from '../utils/initialize';
import '../scss/main.scss';

class IgakuApp extends App {
  static async getInitialProps({ Component, ctx }) {
    await initialize(ctx);
    const { currentUser } = ctx.store.getState();
    const { authenticated, data } = currentUser;
    const { profile } = data;
    const { pathname } = ctx;

    if (authenticated && !profile && pathname !== '/profile/edit') {
      return redirect(ctx, '/profile/edit');
    }

    if (authenticated && profile && (pathname === '/signup' || pathname === '/login')) {
      return redirect(ctx, '/');
    }

    if (!authenticated && pathname === '/profile/edit') {
      return redirect(ctx, '/');
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
