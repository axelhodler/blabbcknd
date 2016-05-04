var Account = require('./account');

describe('account', function() {
  it('has an id', function() {
    var acc = new Account(1);

    expect(acc.getId()).to.equal(1);
  });

  it('has email address', function () {
    var acc = new Account(1, 'foo@bar.baz');

    expect(acc.getEmail()).to.equal('foo@bar.baz');
  });

  it('has ethereum address', function() {
    var acc = new Account(1, 'irrelevant', 'irrelevant', 'address');

    expect(acc.getEtherAddress()).to.equal('address');
  });

  it('has a fullname', function() {
    var acc = new Account(1, 'irrelevant', 'irrelevant', 'address', 'Horus Lupercal');

    expect(acc.getFullName()).to.equal('Horus Lupercal');
  });

  describe('knows', function() {
    var acc = new Account(1, 'irrelevant', 'secret');

    it('if password matches', function() {
      expect(acc.passwordMatches('secret')).to.equal(true);
    });

    it('if passwords do not match', function() {
      expect(acc.passwordMatches('incorrect')).to.equal(false);
    });
  });

});