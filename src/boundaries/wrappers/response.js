module.exports = {
  wrap: function(response) {
    this.response = response;
    return this;
  },
  send: function(result) {
    this.response.send(result);
  },
  sendUnauthorized: function() {
    this.response.sendStatus(401);
  }
};