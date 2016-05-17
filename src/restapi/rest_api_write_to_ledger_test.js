var Request = require('./../boundaries/delivery/request_wrapper');
var Response = require('./../boundaries/delivery/response_wrapper');
var Account = require('./../model/account');

describe('write to ledger', function() {
  var authUser,
    accountGateway,
    writeToLedger,
    api;

  var requestStub,
    responseSpy;

  beforeEach(function() {
    authUser = td.replace('./../actions/auth_user');
    accountGateway = td.replace('./../boundaries/database/account_gateway');
    writeToLedger = td.replace('./../actions/write_to_ledger');

    api = require('./rest_api_write_to_ledger');

    requestStub = td.object(Request);
    responseSpy = td.object(Response);
  });

  it('moves tokens', function() {
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