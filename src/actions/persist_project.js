var Project = require('../model/project');
var projects = new Map();
var projectCounter = 1;

module.exports = {
  store: function(project) {
    projects.set(projectCounter, project);
    projectCounter++;
  },
  findById: function(id) {
    return projects.get(id);
  }
};