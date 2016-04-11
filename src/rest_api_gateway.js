var ledgerGateway = require('./ledger_gateway');

module.exports = {
  fetchOverview: function(req, res) {
    res.send('overview');
  },
  getAll: function(req, res) {
    res.send(ledgerGateway.allBalances());
  }
};