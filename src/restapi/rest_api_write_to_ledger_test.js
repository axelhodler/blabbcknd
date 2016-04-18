var authUser = td.replace('./../actions/auth_user');
var accountGateway = td.replace('./../boundaries/account_gateway');
var writeToLedger = td.replace('./../actions/write_to_ledger');
var api = require('./rest_api_write_to_ledger');
var Request = require('./../boundaries/wrappers/request');
var Response = require('./../boundaries/wrappers/response');
var Account = require('./../model/account');

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
    td.when(authUser.mailInDecoded('validToken')).thenReturn('mail@mail.com');
    var stubbedAccount = new Account(1, 'mail@mail.com', 'irrelevant', 'fromEtherAddr');
    td.when(accountGateway.fetchAccountByEmail('mail@mail.com')).thenReturn(stubbedAccount);
    var stubbedRequest = stubValidToken(requestStub, authUser);
    td.when(stubbedRequest.body()).thenReturn(
      {
        'to':'toEtherAddress',
        'amount':100
      }
    );

    api.moveTokens(stubbedRequest, responseSpy);

    td.verify(writeToLedger.moveTokens('fromEtherAddr', 'toEtherAddress', 100));
    td.verify(responseSpy.sendOk());
  });
});