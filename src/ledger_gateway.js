var LedgerEntry = require('./model/ledger_entry');

module.exports = {
  create: function(ethereumGateway) {
    this.ethereumGateway = ethereumGateway;
    return this;
  },
  balanceOf: function(accountId) {
    return new LedgerEntry(accountId, this.ethereumGateway.balanceOf(accountId));
  }
};