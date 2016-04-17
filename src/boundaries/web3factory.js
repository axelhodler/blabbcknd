var Web3 = require('web3');

module.exports = {
  get: function() {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    return web3;
  }
};