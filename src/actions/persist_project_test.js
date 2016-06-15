'use strict';

var Project = require('../model/project');
var subject = require('./persist_project');

describe('persist project', function() {
  it('saves projects', function() {
    subject.store(new Project('owner', 200));
    subject.store(new Project('owner2', 3000));

    expect(subject.findById(1).availableTokens()).to.equal(200);
    expect(subject.findById(2).availableTokens()).to.equal(3000);
  });
});
