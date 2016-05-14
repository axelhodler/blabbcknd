var faker = require('faker');
var Account = require('../../model/account');
var blockchain = require('./../blockchain/chainaccess');

var stubbedNames = [
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName()
];

var accounts = function () {
  return blockchain.eth.accounts.map(function (ethereumAddress, index) {
    return new Account(
      index,
      'mail' + index + '@test.com',
      'pw' + index,
      ethereumAddress,
      stubbedNames[index]
    )
  });
};

module.exports = {
  fetchOwnerOf: function(etherAddress) {
    return accounts().filter(function(account) {
      return account.getEtherAddress() === etherAddress;
    })[0].getFullName();
  },
  fetchAllEtherAddresses: function() {
    return accounts().map(function(account) {
      return account.getEtherAddress();
    });
  },
  fetchAccountByEmail: function(email) {
    return accounts().filter(function(account) {
      return account.getEmail() === email;
    })[0];
  }
};