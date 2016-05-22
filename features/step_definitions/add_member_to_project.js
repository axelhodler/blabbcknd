var Project = require('../../src/model/project');

module.exports = function() {
  var projectOwner;

  var addMemberToProject = function(member, project) {
    project.addMember(member);
  };

  this.Given(/^a project member "([^"]*)"$/, function (member) {
    addMemberToProject(member, this.project);
  });

  this.When(/^adding the member "([^"]*)" to the project$/, function (member) {
    addMemberToProject(member, this.project);
  });

  this.When(/^assigning (\d+) tokens to the member "([^"]*)"$/, function (tokenAmount, member) {
    this.project.assignTokens(+tokenAmount, member);
  });

  this.Then(/^"([^"]*)" owns (\d+) tokens in the project$/, function (projectmember, expectedAmount) {
    expect(this.project.tokenAmountFor(projectmember)).to.equal(+expectedAmount);
  });

  this.Then(/^member "([^"]*)" has (\d+) tokens$/, function (projectMember, expectedAmount) {
    expect(this.project.tokenAmountFor(projectMember)).to.equal(+expectedAmount);
  });
};