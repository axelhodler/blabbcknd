var balances = [
  {id: '0xf19f24526c0f804b9ddb7d9d80521f9e7e638819', amount: 100},
  {id: '0x7e3098562ba4e34a904c5b412197763d418966bb', amount: 200},
  {id: '0x957fcd52e975bde95b61e5f6057eab44d916a211', amount: 300}
];

module.exports = {
  balanceOf: function(accountId) {
    return balances.filter(function(balance) {
      return balance.id === accountId;
    })[0];
  },
  moveTokens: function(from, to, amount) {
    var updatedBalances = balances.map(function(item) {
      if (item.id === from) {
        item.amount -= amount;
        return item;
      } else if (item.id === to) {
        item.amount += amount;
        return item;
      } else {
        return item;
      }
    });
    balances = updatedBalances;
  }
};
