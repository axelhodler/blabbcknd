var accountGateway = td.replace('./boundaries/account_gateway');
var tokenProvider = td.replace('./boundaries/token_provider');
var authUser = require('./auth_user');
var Account = require('./model/account');

describe('auth user', function() {
  it('returns token if credentials are valid', function() {
    td.when(tokenProvider.sign('payload')).thenReturn('validToken');
    var accountStub = new Account(1, 'mail@host.io', 'password');
    td.when(accountGateway.fetchAccountByEmail('mail@host.io')).thenReturn(accountStub);

    var token = authUser.login('mail@host.io', 'password');

    expect(token).to.equal('validToken');
  });
});