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

  it('knows if password matches', function() {
    var acc = new Account(1, 'irrelevant', 'secret');

    expect(acc.passwordMatches('secret')).to.equal(true);
  });

  it('knows if passwords do not match', function() {
    var acc = new Account(1, 'irrelevant', 'secret');

    expect(acc.passwordMatches('incorrect')).to.equal(false);
  });

  it('has ethereum address', function() {
    var acc = new Account(1, 'irrelevant', 'irrelevant', 'address');

    expect(acc.getEtherAddress()).to.equal('address');
  });
});