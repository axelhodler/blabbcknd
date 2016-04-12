var jwt = require('jsonwebtoken');

module.exports = {
  sign: function(payload, secret) {
    return jwt.sign(payload, secret);
  },
  // e.g. use .verifiedContent().username to get the username in the payload
  verifiedContent: function(token, secret) {
    return jwt.verify(token, secret);
  }
};
