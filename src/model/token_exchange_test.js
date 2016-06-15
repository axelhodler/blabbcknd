'use strict';

var TokenExchange = require('./token_exchange');
var Transaction = require('./fiat_transaction');

describe('exchange', function() {
  it('holds projectid and a transaction', function() {
    var exchange = new TokenExchange('projectId', new Transaction());
  });
});