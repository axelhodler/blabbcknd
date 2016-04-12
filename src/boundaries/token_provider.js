var jwt = require('jsonwebtoken');

var secret = 'secret';

module.exports = {
  sign: function(payload) {
    return jwt.sign(payload, secret);
  },
  // e.g. use .verifiedContent().username to get the username in the payload
  // will throw if token invalid
  verifiedContent: function(token) {
    return jwt.verify(token, secret);
  }
};
