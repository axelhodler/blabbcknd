function Project(projectOwner, tokens) {
  this.tokens = tokens;
}

Project.prototype.availableTokens = function() {
  return this.tokens;
};

module.exports = Project;