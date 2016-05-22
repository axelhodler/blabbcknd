var expect = require('chai').expect;
var Project = require('../../src/model/project');

module.exports = function() {
  var project;

  this.Given(/^a project owner "([^"]*)"$/, function (owner_address) {
    project = new Project(owner_address, 0);
  });

  this.When(/^adding the member "([^"]*)" to the project$/, function (member) {
    project.addMember(member);
  });

  this.Then(/^"([^"]*)" owns (\d+) tokens in the project$/, function (projectmember, expectedAmount) {
    expect(project.tokenAmountFor(projectmember)).to.equal(+expectedAmount);
  });
};