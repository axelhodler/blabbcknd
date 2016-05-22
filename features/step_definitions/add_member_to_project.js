var expect = require('chai').expect;
var Project = require('../../src/model/project');


module.exports = function() {
  var project,
    projectOwner;

  var addMemberToProject = function(member) {
    project.addMember(member);
  };

  this.Given(/^a project owner "([^"]*)"$/, function (owner_address) {
    projectOwner = owner_address;
    project = new Project(owner_address, 0);
  });

  this.Given(/^initial tokens of (\d+)$/, function (initialTokens) {
    project = new Project(projectOwner, +initialTokens);
  });

  this.Given(/^a project member "([^"]*)"$/, function (member) {
    addMemberToProject(member);
  });

  this.When(/^adding the member "([^"]*)" to the project$/, function (member) {
    addMemberToProject(member);
  });

  this.When(/^assigning (\d+) tokens to the member "([^"]*)"$/, function (tokenAmount, member) {
    project.assignTokens(+tokenAmount, member);
  });

  this.Then(/^"([^"]*)" owns (\d+) tokens in the project$/, function (projectmember, expectedAmount) {
    expect(project.tokenAmountFor(projectmember)).to.equal(+expectedAmount);
  });

  this.Then(/^member "([^"]*)" has (\d+) tokens$/, function (projectMember, expectedAmount) {
    expect(project.tokenAmountFor(projectMember)).to.equal(+expectedAmount);
  });

  this.Then(/^the project he participates in has (\d+) tokens$/, function (availableTokens) {
    expect(project.availableTokens()).to.equal(+availableTokens);
  });
};