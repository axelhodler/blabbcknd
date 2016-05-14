var contract = require('./contract').getContract();

module.exports = {
  balanceOf: function(address) {
    return contract.getBalance.call(address);
  },
  moveTokens: function(from, to, amount) {
    contract.sendCoin(to, amount, {from: from});
  }
};
