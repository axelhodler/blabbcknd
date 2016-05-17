var readLedger = require('./../actions/read_ledger');

module.exports = {
  getAll: function(req, res) {
    res.send(readLedger.allBalances());
  },
  getBalanceFor: function(req, res) {
    res.send(readLedger.balanceOf(req.idParam()));
  }
};