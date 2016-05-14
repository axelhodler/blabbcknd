var tokenProvider = require('./token_provider');

describe('TokenProvider', function() {
  it('signs payloads', function () {
    expect(tokenProvider.sign('payload'))
      .to.equal('eyJhbGciOiJIUzI1NiJ9.cGF5bG9hZA.4GMt2k_zZryxhKgC8_HvdSZtYxyEyDa0AFIL-n60a8M');
  });

  it('verifies tokens', function () {
    var payload = 'somePayload';
    var token = tokenProvider.sign(payload);

    expect(tokenProvider.verifiedContent(token)).to.equal(payload);
  });

  it('provides the secret', function() {
    expect(tokenProvider.getSecret()).to.equal('secret');
  });
});