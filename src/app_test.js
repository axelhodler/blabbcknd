var app = require('./app');
var expect = require('chai').expect;

describe('app', function() {
  it('provides an overview on who owns how much tokens', function() {
    var ledger = app.ledger();

    expect(ledger).to.have.length(0);
  });
});
