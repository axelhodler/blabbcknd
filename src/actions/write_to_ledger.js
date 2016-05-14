var ethereumGateway = require('./../boundaries/blockchain/ethereum_gateway');

module.exports = {
  moveTokens: function(from, to, amount) {
    ethereumGateway.moveTokens(from, to, amount);
  },
  destroyTokens: function(from, amount) {
    ethereumGateway.moveTokens(from, '0x0000000000000000000000000000000000000000', amount);
  }
};