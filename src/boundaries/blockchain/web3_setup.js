var blockchain = require('./chainaccess');
var contract = require('./contractfields');
var fs = require('fs');
var Q = require('q');

module.exports = function() {
  var deferred = Q.defer();
  blockchain.eth.contract(contract).new(
    {
      from: blockchain.eth.accounts[0],
      data: '60606040525b612710600060005060003273ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055505b6101ac8061004a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806390b98a1114610044578063f8b2cb4f1461007957610042565b005b61006360048080359060200190919080359060200190919050506100a5565b6040518082815260200191505060405180910390f35b61008f600480803590602001909190505061016e565b6040518082815260200191505060405180910390f35b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410156100e75760009050610168565b81600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054019250508190555060019050610168565b92915050565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506101a7565b91905056',
      gas: 3000000
    }, function(e, contract){
      // this callback will fire twice - first call is the transaction, second call the deployment
      if (typeof contract.address != 'undefined') {
        console.log('Contract mined! address: ' + contract.address
          + ' transactionHash: ' + contract.transactionHash
          + ' owner: ' + blockchain.eth.accounts[0]);
        fs.writeFileSync('contractaddress', contract.address, 'utf8');
        deferred.resolve();
      }
    });
  return deferred.promise;
}();