var accountGateway = td.replace('./boundaries/account_gateway');
var tokenProvider = td.replace('./boundaries/token_provider');
var authUser = require('./auth_user');
var Account = require('./model/account');

describe('auth user', function() {
  it('returns token if credentials are valid', function() {
    var EMAIL = 'email@host.io';
    td.when(tokenProvider.sign(EMAIL)).thenReturn('validToken');
    var accountStub = new Account(1, EMAIL, 'password');
    td.when(accountGateway.fetchAccountByEmail(EMAIL)).thenReturn(accountStub);

    var token = authUser.login(EMAIL, 'password');

    expect(token).to.equal('validToken');
  });

  it('returns token if credentials are valid - triangulation', function() {
    var EMAIL = 'foo@bar.io';
    td.when(tokenProvider.sign(EMAIL)).thenReturn('aValidToken');
    var accountStub = new Account(1, EMAIL, 'pw');
    td.when(accountGateway.fetchAccountByEmail(EMAIL)).thenReturn(accountStub);

    var token = authUser.login(EMAIL, 'pw');

    expect(token).to.equal('aValidToken');
  });

  it('does not return a token for invalid credentials', function() {
    var EMAIL = 'email@host.io';
    var accountStub = new Account(1, EMAIL, 'correctPassword');
    td.when(accountGateway.fetchAccountByEmail(EMAIL)).thenReturn(accountStub);

    var token = authUser.login(EMAIL, 'incorrectPassword');

    expect(token).to.equal(undefined);
    td.verify(tokenProvider.sign('payload'), {times: 0});
  });
});