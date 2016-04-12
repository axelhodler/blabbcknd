var accountGateway = td.replace('./boundaries/account_gateway');
var tokenProvider = td.replace('./boundaries/token_provider');
var authUser = require('./auth_user');
var Account = require('./model/account');

describe('auth user', function() {
  var stubPersistedAccount = function(email, password) {
    var accountStub = new Account(1, email, password);
    td.when(accountGateway.fetchAccountByEmail(email)).thenReturn(accountStub);
  };

  it('returns token if credentials are valid', function() {
    var EMAIL = 'email@host.io';
    stubPersistedAccount(EMAIL, 'password');
    td.when(tokenProvider.sign(EMAIL)).thenReturn('validToken');

    var token = authUser.login(EMAIL, 'password');

    expect(token).to.equal('validToken');
  });

  it('returns token if credentials are valid - triangulation', function() {
    var EMAIL = 'foo@bar.io';
    stubPersistedAccount(EMAIL, 'pw');
    td.when(tokenProvider.sign(EMAIL)).thenReturn('aValidToken');

    var token = authUser.login(EMAIL, 'pw');

    expect(token).to.equal('aValidToken');
  });

  it('does not return a token for invalid credentials', function() {
    var EMAIL = 'email@host.io';
    stubPersistedAccount(EMAIL, 'correctPassword');

    var token = authUser.login(EMAIL, 'incorrectPassword');

    expect(token).to.equal(undefined);
    td.verify(tokenProvider.sign('payload'), {times: 0});
  });

  describe('token validation', function() {
    it('returns true for valid token', function() {
      td.when(tokenProvider.verifiedContent('token')).thenReturn('payload');

      var isValid = authUser.isTokenValid('token');

      expect(isValid).to.equal(true);
    });

    it('returns false for invalid token', function() {
      td.when(tokenProvider.verifiedContent('invalidToken')).thenThrow();

      var isValid = authUser.isTokenValid('invalidToken');

      expect(isValid).to.equal(false);
    });
  });
});