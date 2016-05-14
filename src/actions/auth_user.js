var accountGateway = require('./../boundaries/database/account_gateway');
var tokenProvider = require('./../boundaries/token_provider');

module.exports = {
  login: function(email, password) {
    var account = accountGateway.fetchAccountByEmail(email);
    if (account.passwordMatches(password)) {
      return tokenProvider.sign({mail: email, fullName: account.getFullName()});
    }
  },
  isTokenValid: function(token) {
    try {
      tokenProvider.verifiedContent(token);
      return true;
    } catch(err) {
      return false;
    }
  },
  mailInDecoded: function(token) {
    return tokenProvider.verifiedContent(token).mail;
  }
};