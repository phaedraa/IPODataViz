function handleSelectMovingAvgTimeSeries(event) {
  return $('#chart').highcharts(getOptionsData());

  function getOptionsData() {
    var parsedData = require('./dataHelper.js');
    var TITLES = parsedData.TITLES;
    var IPODATA = parsedData.IPODATA;
    var getSingleAxisOptionsObj = require('./getSingleAxisOptionsObj.js');
    var getDefaultDualAxisSubtitle = require('./getDefaultDualAxisSubtitle.js');

    return getSingleAxisOptionsObj(
      IPODATA.years,
      getSeriesData(),
      'Moving Averages of ' + TITLES.IPO + ' & ' + TITLES.numProfit,
      getDefaultDualAxisSubtitle(),
      TITLES.IPO
    );
  
    function getSeriesData() {
      var mvgAvgData = getMovingAvgData();
      var TSData = [];
      var createSeriesObj = require('./createSeriesObj.js');

      _.keys(mvgAvgData).forEach(function(key) {
        TSData.push(createSeriesObj(
          TITLES.legend[key],
          mvgAvgData[key]
        ));
      });
  
      return TSData;
  
      function getMovingAvgData() {
        var getNewDataObj = require('./getNewDataObj.js');
        var MovingAvgDataObj = getNewDataObj(false);
        for (var j=0; j<IPODATA.years.length; j++) {
          _.keys(MovingAvgDataObj).forEach(function(key) {
            MovingAvgDataObj[key].push(
              getMovingAvg(MovingAvgDataObj[key], IPODATA[key][j])
            );
          });
        }
    
        return MovingAvgDataObj;
    
        function getMovingAvg(currAvgArray, nextVal) {
          var size = currAvgArray.length;
          if (size === 0) {
            return nextVal;
          }
          var nextAvg = (currAvgArray[size - 1] * size + nextVal) / (size + 1);
      
          return Math.round(100 * nextAvg) / 100.0;
        }
      }  
    }
  }  
}

module.exports = handleSelectMovingAvgTimeSeries;

