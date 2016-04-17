module.exports = {
  contract: function() {
    return [{"constant":false,"inputs":
      [{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],
      "name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],
      "type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],
      "name":"getBalance","outputs":[{"name":"","type":"uint256"}],
      "type":"function"},{"inputs":[],"type":"constructor"}];
  }
};