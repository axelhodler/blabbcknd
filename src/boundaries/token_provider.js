var jwt = require('jsonwebtoken');

module.exports = {
  sign: function(payload, secret) {
    return jwt.sign(payload, secret);
  },
  verifiedContent: function(token, secret) {
    return jwt.verify(token, secret);
  }
};
