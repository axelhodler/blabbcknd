global.expect = require('chai').expect;
global.td = require('testdouble');

beforeEach(function() {
  td.reset();
});

global.stubValidToken = function(requestStub, authUser) {
  td.when(authUser.isTokenValid('validToken')).thenReturn(true);
  td.when(requestStub.authorizationHeader()).thenReturn('validToken');
  return requestStub;
};