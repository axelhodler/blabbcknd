var Project = require('../../src/model/project');

var toInt = function(input) {
  return +input;
};

module.exports = function() {
  var owner,
    initialTokens;

  this.Given(/^a prospect project owner "([^"]*)"$/, function (owner_address) {
    owner = owner_address;
  });

  this.Given(/^an amount of initial tokens (\d+)$/, function (tokens) {
    initialTokens = toInt(tokens);
  });

  this.When(/^blocklab creates a project$/, function () {
    this.project = new Project(owner, initialTokens);
  });

  this.Then(/^the project\-owner holds (\d+) tokens$/, function (expectedTokenAmount) {
    expect(this.project.availableTokens()).to.equal(toInt(expectedTokenAmount));
  });
};