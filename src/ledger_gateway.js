var LedgerEntry = require('./model/ledger_entry');
var ethereumGateway = require('./boundaries/ethereum_gateway');

module.exports = {
  balanceOf: function(accountId) {
    return new LedgerEntry(accountId, ethereumGateway.balanceOf(accountId));
  },
  balancesForAllIn: function(accountIds) {
    return accountIds.map(function(accountId) {
      return new LedgerEntry(accountId, ethereumGateway.balanceOf(accountId));
    });
  }
};