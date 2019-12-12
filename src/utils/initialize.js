import Router from 'next/router';
import decode from 'jwt-decode';
import axios from 'axios';
import { getCookie } from './cookie';
import { setAuthorizationToken } from './api';
import { fetchUserData } from '../store/thunks/user';

export default async (ctx) => {
  if (ctx.isServer) {
    console.log('INITIALIZE GOT CALLED ON THE SERVER');
    if (ctx.req.headers.cookie) {
      const { req, store } = ctx;
      const { dispatch } = store;
      const token = getCookie('token', req);
      const id = decode(token).user_id;
      setAuthorizationToken(token);
      await dispatch(fetchUserData(id));
    }
  } else {
    try {
      const { token } = localStorage;
      setAuthorizationToken(token);
      if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
        setTimeout(() => Router.push('/'), 0);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};
