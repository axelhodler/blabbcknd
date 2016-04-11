var expect = require('chai').expect;
var Account = require('./account');

describe('account', function() {
  it('has mail address', function () {
    var acc = new Account('foo@bar.baz');

    expect(acc.getMail()).to.equal('foo@bar.baz');
  });

  it('has password', function() {
    var acc = new Account('irrelevant', 'password');

    expect(acc.getPassword()).to.equal('password');
  });

  it('has ethereum address', function() {
    var acc = new Account('irrelevant', 'password', 'address');

    expect(acc.getEtherAddress()).to.equal('address');
  });
});