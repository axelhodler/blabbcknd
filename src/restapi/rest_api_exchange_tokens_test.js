var writeToLedger = td.replace('./../actions/write_to_ledger');

var exchangeTokens = require('./rest_api_exchange_tokens');

var Request = require('./../boundaries/wrappers/request');
var Response = require('./../boundaries/wrappers/response');

describe('Rest API exchange tokens', function() {
  var requestStub,
    responseSpy;

  beforeEach(function() {
    requestStub = td.object(Request);
    responseSpy = td.object(Response);
  });

  it('can exchange tokens to euro', function() {
    td.when(requestStub.body()).thenReturn(
      {
        'recipient':'addressToRemoveFrom',
        'amount':100
      }
    );

    exchangeTokens.toEuro(requestStub, responseSpy);

    td.verify(writeToLedger.destroyTokens('addressToRemoveFrom', 100));
  });
});