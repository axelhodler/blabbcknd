var expect = require('chai').expect;

module.exports = function () {
  this.Given(/^a variable set to (\d+)$/, function (value, callback) {
    this.value = +value;
    callback();
  });

  this.When(/^I increment the variable by (\d+)$/, function (increment, callback) {
    this.value += +increment;
    callback();
  });

  this.Then(/^the variable should contain (\d+)$/, function (result, callback) {
    expect(this.value).to.equal(+result);
    callback();
  });
};
