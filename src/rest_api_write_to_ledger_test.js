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

  it('can move tokens', function() {
    api.moveTokens(requestStub, responseSpy);
  })
});