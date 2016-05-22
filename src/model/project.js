function Project(projectOwner, tokens) {
  this.tokens = tokens;
}

Project.prototype.availableTokens = function() {
  return this.tokens;
};

Project.prototype.addMember = function(member) {

};

Project.prototype.tokenAmountFor = function(member) {
  return 0;
};

module.exports = Project;