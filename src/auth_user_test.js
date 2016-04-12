var accountGateway = td.replace('./boundaries/account_gateway');
var tokenProvider = td.replace('./boundaries/token_provider');
var authUser = require('./auth_user');
var Account = require('./model/account');

describe('auth user', function() {
  it('returns token if credentials are valid', function() {
    td.when(tokenProvider.sign('mail@host.io')).thenReturn('validToken');
    var accountStub = new Account(1, 'mail@host.io', 'password');
    td.when(accountGateway.fetchAccountByEmail('mail@host.io')).thenReturn(accountStub);

    var token = authUser.login('mail@host.io', 'password');

    expect(token).to.equal('validToken');
  });

  it('returns token if credentials are valid - triangulation', function() {
    td.when(tokenProvider.sign('foo@bar.io')).thenReturn('aValidToken');
    var accountStub = new Account(1, 'foo@bar.io', 'pw');
    td.when(accountGateway.fetchAccountByEmail('foo@bar.io')).thenReturn(accountStub);

    var token = authUser.login('foo@bar.io', 'pw');

    expect(token).to.equal('aValidToken');
  });

  it('does not return a token for invalid credentials', function() {
    var accountStub = new Account(1, 'mail@host.io', 'correctPassword');
    td.when(accountGateway.fetchAccountByEmail('mail@host.io')).thenReturn(accountStub);

    var token = authUser.login('mail@host.io', 'incorrectPassword');

    expect(token).to.equal(undefined);
    td.verify(tokenProvider.sign('payload'), {times: 0});
  });
});