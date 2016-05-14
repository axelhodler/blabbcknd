var fs = require('fs');
var blockchain = require('./chainaccess');
var contractFields = require('./contractfields');

module.exports = function() {
  var address = fs.readFileSync('contractaddress', 'utf8');
  var contract = blockchain.eth.contract(contractFields);
  return blockchain.eth.contract(contract.abi).at(address);
};