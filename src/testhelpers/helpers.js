global.expect = require('chai').expect;
global.td = require('testdouble');

afterEach(function() {
  td.reset();
});

global.stubInvalidToken = function(requestStub, authUser) {
  td.when(authUser.isTokenValid('invalidToken')).thenReturn(false);
  td.when(requestStub.authorizationHeader()).thenReturn('invalidToken');
  return requestStub;
};

global.stubValidToken = function(requestStub, authUser) {
  td.when(authUser.isTokenValid('validToken')).thenReturn(true);
  td.when(requestStub.authorizationHeader()).thenReturn('validToken');
  return requestStub;
};