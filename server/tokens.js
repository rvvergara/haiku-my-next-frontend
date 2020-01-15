const twilio = require('twilio');
const secrets = require('../src/utils/secrets-manager');

const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

if (process.env === 'production') {
  secrets.getAPIKey();
}

const generateToken = () => new AccessToken(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_API_KEY,
  process.env.TWILIO_API_SECRET,
  );

const videoToken = (identity, room) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken();
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

module.exports = { videoToken };
