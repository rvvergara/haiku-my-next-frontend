const AWS = require('aws-sdk');

const region = 'ap-southeast-1';
const secretName = 'Twilio-Credentials';
let secret;

const client = new AWS.SecretsManager({
  region,
});

const getAPIKey = async () => new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        if (err.code === 'DecryptionFailureException') { reject(err); } else if (err.code === 'InternalServiceErrorException') { reject(err); } else if (err.code === 'InvalidParameterException') { reject(err); } else if (err.code === 'InvalidRequestException') { reject(err); } else if (err.code === 'ResourceNotFoundException') { reject(err); }
      } else if ('SecretString' in data) {
          secret = data.SecretString;
        } else {
        const buff = new Buffer(data.SecretBinary, 'base64');
        decodedBinarySecret = buff.toString('ascii');
      }
      const twilioCredentials = secret ? JSON.parse(secret) : process.env;
      process.env.TWILIO_ACCOUNT_SID = twilioCredentials.TWILIO_ACCOUNT_SID;
      process.env.TWILIO_API_KEY = twilioCredentials.TWILIO_API_KEY;
      process.env.TWILIO_API_SECRET = twilioCredentials.TWILIO_API_SECRET;
      resolve();
    });
  });

module.exports = {
  getAPIKey,
};
