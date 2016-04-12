var accountGateway = require('./boundaries/account_gateway');
var tokenProvider = require('./boundaries/token_provider');

module.exports = {
  login: function(mailAddress, password) {
    if (accountGateway.fetchAccountByEmail(mailAddress).passwordMatches(password)) {
      return tokenProvider.sign(mailAddress);
    }
  }
};