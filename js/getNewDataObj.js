function getNewDataObj(profitTypeIsPercent = true) {
  var MAP = {
    techPercProfits: 'techNumProfit',
    otherPercProfits: 'otherNumProfit'
  };
  var dataObj = { techIPOs: [], otherIPOs: [] };
  _.keys(MAP).forEach(function(key) {
    key = getSwitchedKey(key, profitTypeIsPercent);
    dataObj[key] = [];
  });

  return dataObj;

  function getSwitchedKey(key, profitTypeIsPercent) {
    return !profitTypeIsPercent ? MAP[key] : key;
  }
}