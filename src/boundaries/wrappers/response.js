function Response(response) {
  this.response = response;
};

Response.prototype.send = function(result) {
  this.response.send(result);
};

Response.prototype.sendUnauthorized = function() {
  this.response.sendStatus(401);
};

module.exports = Response;
