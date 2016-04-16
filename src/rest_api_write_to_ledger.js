var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');
var authUser = require('./actions/auth_user');

var checkTokenValidity = function(req) {
  return authUser.isTokenValid(req.authorizationHeader());
};

var unauthorizedResponse = function(res) {
  res.sendUnauthorized();
};

module.exports = {
  moveTokens: function(request, response) {
    checkTokenValidity(request) ? 'nothing' : unauthorizedResponse(response);
  }
};