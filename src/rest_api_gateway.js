var ledgerGateway = require('./ledger_gateway');

module.exports = {
  getAll: function(req, res) {
    res.send(ledgerGateway.allBalances());
  }
};