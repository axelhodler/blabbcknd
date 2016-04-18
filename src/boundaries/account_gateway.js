var Account = require('../model/account');
var web3factory = require('./web3factory');

var accounts = function() {
  return web3factory.get().eth.accounts.map(function(address, index) {
    return new Account(index, 'mail' + index + '@test.com', 'pw' + index, address);
  });
};

module.exports = {
  fetchAllEtherAddresses: function() {
    return accounts().map(function(account) {
      return account.getEtherAddress();
    });
  },
  fetchEthereumAddressFor: function(accountId) {
    return accounts().filter(function(account) {
      return account.getId() === parseInt(accountId);
    })[0].getEtherAddress();
  },
  fetchAccountByEmail: function(email) {
    return accounts().filter(function(account) {
      return account.getEmail() === email;
    })[0];
  }
};