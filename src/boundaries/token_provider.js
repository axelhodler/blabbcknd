var jwt = require('jsonwebtoken');

module.exports = {
  sign: function(payload, secret) {
    return jwt.sign(payload, secret);
  },
  verify: function(token, secret) {
    return jwt.verify(token, secret);
  },
  decodePayload: function(token) {
    return jwt.decode(token, {complete:true}).payload;
  }
};
