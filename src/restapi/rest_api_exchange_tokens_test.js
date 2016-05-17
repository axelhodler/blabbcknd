var Request = require('./../boundaries/delivery/request_wrapper');
var Response = require('./../boundaries/delivery/response_wrapper');

describe('Rest API exchange tokens', function() {
  var writeToLedger,
    exchangeTokens;

  var requestStub,
    responseSpy;

  beforeEach(function() {
    writeToLedger = td.replace('./../actions/write_to_ledger');

    exchangeTokens = require('./rest_api_exchange_tokens');

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