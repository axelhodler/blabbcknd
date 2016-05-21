var expect = require('chai').expect;
var Project = require('../../src/model/project');

module.exports = function() {
  var project,
    owner,
    initialTokens;

  this.Given(/^a prospect project owner "([^"]*)"$/, function (owner_address) {
    owner = owner_address;
  });

  this.Given(/^an amount of initial tokens (\d+)$/, function (tokens) {
    initialTokens = tokens;
  });

  this.When(/^blocklab creates a project$/, function () {
    project = new Project(owner, initialTokens);
  });

  this.Then(/^the project\-owner holds (\d+) tokens$/, function (expectedTokenAmount) {
    expect(project.availableTokens()).to.equal(+expectedTokenAmount);
  });
};