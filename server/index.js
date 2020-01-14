const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('../i18n');
const { videoToken } = require('./tokens');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    }),
  );
};

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });

  server.get('/video/token', (req, res) => {
    const { identity } = req.query;
    const { room } = req.query;
    const token = videoToken(identity, room);
    sendTokenResponse(token, res);
  });

  server.post('/video/token', (req, res) => {
    console.log('REQ BODY', req.body);
    const { identity } = req.body;
    const { room } = req.body;
    const token = videoToken(identity, room);
    sendTokenResponse(token, res);
  });

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
