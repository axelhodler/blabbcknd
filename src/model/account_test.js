var expect = require('chai').expect;
var Account = require('./account');

describe('account', function() {
  it('has an id', function() {
    var acc = new Account(1);

    expect(acc.getId()).to.equal(1);
  });

  it('has mail address', function () {
    var acc = new Account(1, 'foo@bar.baz');

    expect(acc.getMail()).to.equal('foo@bar.baz');
  });

  it('has password', function() {
    var acc = new Account(1, 'irrelevant', 'password');

    expect(acc.getPassword()).to.equal('password');
  });

  it('has ethereum address', function() {
    var acc = new Account(1, 'irrelevant', 'irrelevant', 'address');

    expect(acc.getEtherAddress()).to.equal('address');
  });
});