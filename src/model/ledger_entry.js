function LedgerEntry(accountId, tokenAmount) {
  this.accountId = accountId;
  this.tokenAmount = tokenAmount;
}

LedgerEntry.prototype.getAccountId = function() {
  return this.accountId;
};

LedgerEntry.prototype.getTokenAmount = function() {
  return this.tokenAmount;
};

module.exports = LedgerEntry;



