var LedgerEntry = require('./../model/ledger_entry');
var Ownership = require('./../model/ownership');
var ethereumGateway = require('./../boundaries/ethereum_gateway');
var accountGateway = require('./../boundaries/account_gateway');

var buildLedgerEntry = function(accountId) {
  return new LedgerEntry(accountId, ethereumGateway.balanceOf(accountId));
};
module.exports = {
  balanceOf: function(accountId) {
    return buildLedgerEntry(accountGateway.fetchEthereumAddressFor(accountId));
  },
  allBalances: function() {
    return accountGateway.fetchAllEtherAddresses().map(function(accountId) {
      return new Ownership(buildLedgerEntry(accountId), accountGateway.fetchOwnerOf(accountId));
    });
  }
};