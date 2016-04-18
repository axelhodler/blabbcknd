var web3factory = require('./web3factory');
var fs = require('fs');

module.exports = {
  contract: function() {
    return [{"constant":false,"inputs":
      [{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],
      "name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],
      "type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],
      "name":"getBalance","outputs":[{"name":"","type":"uint256"}],
      "type":"function"},{"inputs":[],"type":"constructor"}];
  },
  getContract: function() {
    var address = fs.readFileSync('contractaddress', 'utf8');
    var contract = web3factory.get().eth.contract(this.contract());
    return web3factory.get().eth.contract(contract.abi).at(address);
  }
};