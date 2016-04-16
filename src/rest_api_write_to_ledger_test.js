var authUser = td.replace('./actions/auth_user');
var api = require('./rest_api_write_to_ledger');
var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');

describe('write to ledger', function() {
  var requestStub,
    responseSpy;

  beforeEach(function() {
    requestStub = td.object(Request);
    responseSpy = td.object(Response);
  });

  var stubInvalidToken = function() {
    td.when(authUser.isTokenValid('invalidToken')).thenReturn(false);
    td.when(requestStub.authorizationHeader()).thenReturn('invalidToken');
    return requestStub;
  };

  var stubValidToken = function() {
    td.when(authUser.isTokenValid('validToken')).thenReturn(true);
    td.when(requestStub.authorizationHeader()).thenReturn('validToken');
    return requestStub;
  };

  it('is not allowed for guests', function() {
    api.moveTokens(stubInvalidToken(), responseSpy);

    td.verify(responseSpy.sendUnauthorized());
  });

  it('moves tokens if authorized', function() {
    api.moveTokens(stubValidToken(), responseSpy);

    td.verify(responseSpy.sendUnauthorized(), {times: 0});
  });
});