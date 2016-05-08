var readLedger = require('./../actions/read_ledger');
var authUser = require('./../actions/auth_user');

module.exports = {
  getAll: function(req, res) {
    res.send(readLedger.allBalances())
  },
  getBalanceFor: function(req, res) {
    res.send(readLedger.balanceOf(req.idParam()));
  }
};