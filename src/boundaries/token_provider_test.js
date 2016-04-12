var expect = require('chai').expect;
var tokenProvider = require('./token_provider');

describe('token provider', function() {
  it('can sign and get verified content', function() {
    var secret = 'secret';

    var token = tokenProvider.sign({foo: 'bar', baz: 'lol'}, secret);

    var verfiedContent = tokenProvider.verifiedContent(token, secret);
    expect(verfiedContent.foo).to.equal('bar');
    expect(verfiedContent.baz).to.equal('lol');
  });
});
