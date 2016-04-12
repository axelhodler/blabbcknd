var ledgerGateway = require('./ledger_gateway');
var authUser = require('./auth_user');

module.exports = {
  getAll: function(req, res) {
    res.send(ledgerGateway.allBalances());
  },
  getBalanceFor: function(req, res) {
    res.send(ledgerGateway.balanceOf(req.params.id));
  },
  login: function(req, res) {
    res.send(authUser.login(req.body.email, req.body.password));
  }
};