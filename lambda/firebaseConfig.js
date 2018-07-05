const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://worldcup-2018-sweepstake-fa99c.firebaseio.com'
};

module.exports = config;
