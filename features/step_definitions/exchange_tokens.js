module.exports = function() {
  this.Given(/^a member "([^"]*)" has (\d+) tokens$/, function (member, tokens) {
    this.project.addMember(member);
    this.project.assignTokens(+tokens, member);
  });

  this.When(/^member "([^"]*)" exchanges (\d+) tokens to euro$/, function (member, tokensToExchange) {
    this.project.exchangeTokens(tokensToExchange, member);
  });

  this.Then(/^member "([^"]*)" has (\d+) tokens left$/, function (member, expectedTokens) {
    expect(this.project.tokenAmountFor(member)).to.equal(+expectedTokens);
  });
};