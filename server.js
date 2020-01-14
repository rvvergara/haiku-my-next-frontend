const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const { AccessToken } = require('twilio').jwt;

const { VideoGrant } = AccessToken;

const nextI18next = require('./i18n');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get('/token', (req, res) => {
    const identity = 'Ryan V';
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );
    token.identity = identity;
    const grant = new VideoGrant();
    token.addGrant(grant);
    res.send({
      identity,
      token: token.toJwt()
    });
  });

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
