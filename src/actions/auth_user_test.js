describe('auth user', function() {

  var accountGateway;
  var tokenProvider;
  var authUser;
  var Account;

  beforeEach(function() {
    accountGateway = td.replace('./../boundaries/database/account_gateway');
    tokenProvider = td.replace('./../boundaries/security/token_provider');

    authUser = require('./auth_user');
    Account = require('./../model/account');
  });

  describe('login', function() {
    var stubPersistedAccount = function(email, password, fullName) {
      var accountStub = new Account(1, email, password, '', fullName);
      td.when(accountGateway.fetchAccountByEmail(email)).thenReturn(accountStub);
    };

    it('returns token if credentials are valid', function() {
      var EMAIL = 'email@host.io';
      stubPersistedAccount(EMAIL, 'password', 'peter');
      var payload = {
        mail: EMAIL,
        fullName: 'peter'
      };
      td.when(tokenProvider.sign(payload)).thenReturn('validToken');

      var token = authUser.login(EMAIL, 'password');

      expect(token).to.equal('validToken');
    });

    it('returns token if credentials are valid - triangulation', function() {
      var EMAIL = 'foo@bar.io';
      stubPersistedAccount(EMAIL, 'pw', 'mary');
      var payload = {
        mail: EMAIL,
        fullName: 'mary'
      };
      td.when(tokenProvider.sign(payload)).thenReturn('aValidToken');

      var token = authUser.login(EMAIL, 'pw');

      expect(token).to.equal('aValidToken');
    });

    it('does not return a token for invalid credentials', function() {
      var EMAIL = 'email@host.io';
      stubPersistedAccount(EMAIL, 'correctPassword', 'paul');

      var token = authUser.login(EMAIL, 'incorrectPassword');

      expect(token).to.equal(undefined);
      td.verify(tokenProvider.sign('payload'), {times: 0});
    });
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

  describe('token payload', function(){
    it('mail can be accessed', function() {
      td.when(tokenProvider.verifiedContent('token'))
        .thenReturn({
          mail: 'mailInDecoded@mailInDecoded.com'
        }, {
          mail: 'mail2@mail2.com'
        });

      var firstAuthenticatedUserMail = authUser.mailInDecoded('token');
      var secondAuthenticatedUserMail = authUser.mailInDecoded('token');

      expect(firstAuthenticatedUserMail).to.equal('mailInDecoded@mailInDecoded.com');
      expect(secondAuthenticatedUserMail).to.equal('mail2@mail2.com');
    });
  });
});