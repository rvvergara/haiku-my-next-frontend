import redirect from 'next-redirect';
import moment from 'moment';

export const redirectIfNoProfile = (ctx, data) => {
  if (!(data.patient || data.practitioner) && !(ctx.pathname === '/profile/new')) {
    return redirect(ctx, '/profile/new');
  }
  if (ctx.pathname === '/login' || ctx.pathname === '/signup') {
    return redirect(ctx, '/');
  }
  return ctx;
};

export const redirectIfNoToken = (ctx) => {
  const { pathname } = ctx;
  if (!(pathname === '/' || pathname === '/signup' || pathname === '/login' || pathname === '/verify' || pathname === '/verify-account' || pathname === '/reverification-sent')) {
    return redirect(ctx, '/');
  }
  return ctx;
};

export const checkIfTokenExp = (decoded) => {
  const expirationTime = moment.unix(decoded.exp);
  const nowTime = moment();
  return expirationTime < nowTime;
};
