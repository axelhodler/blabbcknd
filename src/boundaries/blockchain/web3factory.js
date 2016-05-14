var Web3 = require('web3');

module.exports = {
  init: function() {
    this.web3 = new Web3();
    this.web3.setProvider(new this.web3.providers.HttpProvider('http://localhost:8545'));
    return this;
  },
  get: function() {
    return this.web3;
  }
};