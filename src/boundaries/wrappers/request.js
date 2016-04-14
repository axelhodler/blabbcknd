function Request(request) {
  this.request = request;
};

Request.prototype.idParam = function() {
  return this.request.params.id;
};

Request.prototype.authorizationHeader = function() {
  return this.request.get('Authorization');
};

Request.prototype.body = function() {
  return this.request.body;
};

module.exports = Request;