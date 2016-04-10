var LedgerEntry = require('./model/ledger_entry');
var ethereumGateway = require('./ethereum_gateway');

module.exports = {
  balanceOf: function(accountId) {
    return new LedgerEntry(accountId, ethereumGateway.balanceOf(accountId));
  }
};