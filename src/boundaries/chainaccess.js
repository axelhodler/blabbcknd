var web3 = require('./web3factory').init();

module.exports = {
  get: function() {
    return web3.get();
  }
};