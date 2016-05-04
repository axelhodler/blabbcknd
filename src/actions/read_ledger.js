var LedgerEntry = require('./../model/ledger_entry');
var Ownership = require('./../model/ownership');
var ethereumGateway = require('./../boundaries/ethereum_gateway');
var accountGateway = require('./../boundaries/account_gateway');

var buildLedgerEntry = function(ethereumAddress) {
  return new LedgerEntry(ethereumAddress, ethereumGateway.balanceOf(ethereumAddress));
};

var buildOwnerShipOf = function(ethereumAddress) {
  return new Ownership(
    buildLedgerEntry(ethereumAddress),
    accountGateway.fetchOwnerOf(ethereumAddress)
  );
};

module.exports = {
  balanceOf: function(ethereumAddress) {
    return buildOwnerShipOf(ethereumAddress);
  },
  allBalances: function() {
    return accountGateway.fetchAllEtherAddresses()
      .map(function(ethereumAddress) {
        return buildOwnerShipOf(ethereumAddress);
      });
  }
};