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

  it('is not allowed for guests', function() {
    api.moveTokens(stubInvalidToken(requestStub, authUser), responseSpy);

    td.verify(responseSpy.sendUnauthorized());
  });

  it('moves tokens if authorized', function() {
    api.moveTokens(stubValidToken(requestStub, authUser), responseSpy);

    td.verify(responseSpy.sendOk());
  });
});