var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');
var authUser = require('./actions/auth_user');
var writeToLedger = require('./actions/write_to_ledger');
var accountGateway = require('./boundaries/account_gateway');

var checkTokenValidity = function(req) {
  return authUser.isTokenValid(req.authorizationHeader());
};

var unauthorizedResponse = function(res) {
  res.sendUnauthorized();
};

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
    checkTokenValidity(request)
      ? moveTokens(request, response).sendOk()
      : unauthorizedResponse(response);
  }
};