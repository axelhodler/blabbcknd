var expect = require('chai').expect;
var tokenProvider = require('./token_provider');

describe('token provider', function() {
  it('can sign, decond and verify tokens', function() {
    var secret = 'secret';

    var token = tokenProvider.sign({foo: 'bar'}, secret);
    var decodedPayload = tokenProvider.decodePayload(token);

    expect(decodedPayload.foo).to.equal('bar');
    expect(tokenProvider.verify(token, secret).foo).to.equal('bar');
  });
});
