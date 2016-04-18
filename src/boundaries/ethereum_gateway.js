var contract = require('./contract');

module.exports = {
  balanceOf: function(address) {
    return contract.getContract().getBalance.call(address);
  },
  moveTokens: function(from, to, amount) {
    contract.getContract().sendCoin(to, amount, {from: from});
  }
};
