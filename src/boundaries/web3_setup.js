var Web3 = require('web3');

module.exports = {
  setup: function() {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    var metacoinContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}]);
    var metacoin = metacoinContract.new(
      {
        from: web3.eth.accounts[0],
        data: '60606040525b612710600060005060003273ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055505b6101ac8061004a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806390b98a1114610044578063f8b2cb4f1461007957610042565b005b61006360048080359060200190919080359060200190919050506100a5565b6040518082815260200191505060405180910390f35b61008f600480803590602001909190505061016e565b6040518082815260200191505060405180910390f35b600081600060005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410156100e75760009050610168565b81600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555081600060005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054019250508190555060019050610168565b92915050565b6000600060005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506101a7565b91905056',
        gas: 3000000
      }, function(e, contract){
        console.log(e, contract);
        if (typeof contract.address != 'undefined') {
          console.log('Contract mined! address: ' + contract.address
            + ' transactionHash: ' + contract.transactionHash
            + ' owner' + web3.eth.accounts[0]);
        }
      });
  }
};
