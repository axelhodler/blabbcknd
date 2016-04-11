var LedgerEntry = require('./model/ledger_entry');
var ethereumGateway = require('./boundaries/ethereum_gateway');
var accountGateway = require('./boundaries/account_gateway');

module.exports = {
  balanceOf: function(accountId) {
    return new LedgerEntry(accountId, ethereumGateway.balanceOf(accountId));
  },
  allBalances: function() {
    return accountGateway.fetchAll().map(function(accountId) {
      return new LedgerEntry(accountId, ethereumGateway.balanceOf(accountId));
    });
  }
};