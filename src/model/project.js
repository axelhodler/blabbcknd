function Project(projectOwner, tokens) {
  this.members = new Map();
  this.tokens = tokens;
}

Project.prototype.availableTokens = function() {
  return this.tokens;
};

Project.prototype.addMember = function(member) {
  this.members.set(member, 0);
};

Project.prototype.tokenAmountFor = function(member) {
  return this.members.get(member);
};

Project.prototype.assignTokens = function(amount, member) {
  this.tokens -= amount;
  this.members.set(member, amount);
};

module.exports = Project;