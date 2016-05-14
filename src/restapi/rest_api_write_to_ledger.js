var authUser = require('./../actions/auth_user');
var writeToLedger = require('./../actions/write_to_ledger');
var accountGateway = require('./../boundaries/account_gateway');

var moveTokens = function(req, res) {
  writeToLedger.moveTokens(
    accountGateway.fetchAccountByEmail(
      authUser.mailInDecoded(
        req.authorizationHeader()))
      .getEtherAddress(),
    req.body().to,
    req.body().amount);
  return res;
};

module.exports = {
  moveTokens: function(request, response) {
    moveTokens(request, response).sendOk();
  }
};