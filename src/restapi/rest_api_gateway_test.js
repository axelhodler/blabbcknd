var Request = require('./../boundaries/delivery/request_wrapper');
var Response = require('./../boundaries/delivery/response_wrapper');

describe('rest api gateway', function() {
  var authUser,
    api;

  var responseSpy,
    requestStub;

  beforeEach(function() {
    authUser = td.replace('./../actions/auth_user');

    api = require('./rest_api_gateway');

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