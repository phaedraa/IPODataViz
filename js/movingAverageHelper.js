function handleSelectMovingAvgDualAxisTimeSeries(event) {
  var mvgAvgData = getMovingAvgData();
  var TSData = [];
  _.keys(mvgAvgData).forEach(function(key) {
    var symbol = key === 'techPercProfits' || 'otherPercProfits' ? '%' : '';
    TSData.push(createSeriesObj(
      TITLES.legend[key],
      mvgAvgData[key],
      symbol
    ));
  });

  var options = getDualAxisOptionsObj(
    IPODATA.years,
    TSData,
    'Moving Averages of ' + TITLES.IPO + ' & ' + TITLES.percProfit,
     getDefaultDualAxisSubtitle(),
    TITLES.percProfit + ' Moving Avg',
    TITLES.IPO + ' Moving Avg',
    [IPODATA.years.length * 25, 0],
    '%',
    ''
  );

  return $('#chart').highcharts(options);

  function getMovingAvg(currAvgArray, nextVal) {
    var size = currAvgArray.length;
    if (size === 0) {
      return nextVal;
    }
    var nextAvg = (currAvgArray[size - 1] * size + nextVal) / (size + 1);

    return Math.round(100 * nextAvg) / 100.0;
  }

  function getMovingAvgData() {
    var MovingAvgDataObj = getNewDataObj();
    for (var j=0; j<IPODATA.years.length; j++) {
      _.keys(MovingAvgDataObj).forEach(function(key) {
        MovingAvgDataObj[key].push(
          getMovingAvg(MovingAvgDataObj[key], IPODATA[key][j])
        );
      });
    }

    return MovingAvgDataObj;
  }
}
