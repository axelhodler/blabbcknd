var accountGateway = require('./boundaries/account_gateway');
var tokenProvider = require('./boundaries/token_provider');

module.exports = {
  login: function(email, password) {
    if (accountGateway.fetchAccountByEmail(email).passwordMatches(password)) {
      return tokenProvider.sign(email);
    }
  },
  isTokenValid: function(token) {
    try {
      tokenProvider.verifiedContent(token);
      return true;
    } catch(err) {
      return false;
    }
  }
};