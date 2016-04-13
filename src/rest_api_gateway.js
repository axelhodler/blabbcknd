var ledgerGateway = require('./ledger_gateway');
var authUser = require('./auth_user');

var checkTokenValidity = function(req) {
  return authUser.isTokenValid(req.get('Authorization'));
};

var unauthorizedResponse = function(res) {
  res.sendStatus(401);
};

module.exports = {
  getAll: function(req, res) {
    checkTokenValidity(req)
      ? res.send(ledgerGateway.allBalances())
      : unauthorizedResponse(res);
  },
  getBalanceFor: function(req, res) {
    checkTokenValidity(req)
      ? res.send(ledgerGateway.balanceOf(req.params.id))
      : unauthorizedResponse(res);
  },
  login: function(req, res) {
    res.send(authUser.login(req.body.email, req.body.password));
  }
};