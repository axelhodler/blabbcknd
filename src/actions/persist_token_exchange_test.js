'use strict';

var persistTokenExchange = require('./persist_token_exchange');
var TokenExchange = require('../model/token_exchange');
var FiatTransaction = require('../model/fiat_transaction');

describe('persist token exchange', function() {
  it('stores token exchanges', function() {
    persistTokenExchange.store(new TokenExchange('projectId', new FiatTransaction(8, 'userId')));
  });
});