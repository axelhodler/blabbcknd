var readLedger = require('./actions/read_ledger');
var authUser = require('./actions/auth_user');

var checkTokenValidity = function(req) {
  return authUser.isTokenValid(req.authorizationHeader());
};

var unauthorizedResponse = function(res) {
  res.sendUnauthorized();
};

module.exports = {
  getAll: function(req, res) {
    checkTokenValidity(req)
      ? res.send(readLedger.allBalances())
      : unauthorizedResponse(res);
  },
  getBalanceFor: function(req, res) {
    checkTokenValidity(req)
      ? res.send(readLedger.balanceOf(req.idParam()))
      : unauthorizedResponse(res);
  }
};