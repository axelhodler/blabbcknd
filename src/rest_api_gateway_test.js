var authUser = td.replace('./actions/auth_user');
var api = require('./rest_api_gateway');
var Request = require('./boundaries/wrappers/request');
var Response = require('./boundaries/wrappers/response');

describe('rest api gateway', function() {
  var responseSpy,
    requestStub;

  beforeEach(function() {
    responseSpy = td.object(Response);
    requestStub = td.object(Request);
  });

  describe('auth', function() {
    it('can provide tokens to users', function() {
      td.when(requestStub.body()).thenReturn({ email: 'foo@bar.io', password: 'pw'});
      td.when(authUser.login(requestStub.body().email, requestStub.body().password))
        .thenReturn('validToken');

      api.login(requestStub, responseSpy);

      td.verify(responseSpy.send('validToken'));
    });
  });

});