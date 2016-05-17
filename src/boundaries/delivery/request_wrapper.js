function Request(request) {
  this.request = request;
}

Request.prototype.idParam = function() {
  return this.request.swagger.params.id.value;
};

Request.prototype.authorizationHeader = function() {
  return this.request.get('Authorization');
};

Request.prototype.body = function() {
  return this.request.body;
};

Request.prototype.user = function() {
  return this.request.user;
};

module.exports = Request;