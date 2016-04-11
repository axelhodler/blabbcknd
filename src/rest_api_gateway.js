var ledgerGateway = require('./ledger_gateway');

module.exports = {
  getAll: function(req, res) {
    res.send(ledgerGateway.allBalances());
  },
  getBalanceFor: function(req, res) {
    res.send(ledgerGateway.balanceOf(req.params.id));
  }
};