var jwt = require('jsonwebtoken');
var tokenSecret = require('./tokensecret');

module.exports = {
  sign: function(payload) {
    return jwt.sign(payload, tokenSecret.get());
  },
  // e.g. use .verifiedContent().username to get the username in the payload
  // will throw if token invalid
  verifiedContent: function(token) {
    return jwt.verify(token, tokenSecret.get());
  }
};
