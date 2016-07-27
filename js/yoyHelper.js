function handleSelectYoYGrowthTimeSeries(event) {
  return $('#chart').highcharts(getOptionsData());

  function getOptionsData() {
    var parsedData = require('./dataHelper.js');
    var TITLES = parsedData.TITLES;
    var IPODATA = parsedData.IPODATA;
    var getSingleAxisOptionsObj = require('./getSingleAxisOptionsObj.js');

    return getSingleAxisOptionsObj(
      IPODATA.years.slice(1),
      getSeriesData(),
      'Year Over Year % Changes in IPOs & ' + TITLES.percProfit,
      '',
      'YoY Changes (%)',
      [IPODATA.years.length / 2, 20],
      '%'
    );

    function getSeriesData() {
      var YoYData = getYoYPercChangesData();
      var TSData = [];
      var createSeriesObj = require('./createSeriesObj.js');

      _.keys(YoYData).forEach(function(key) {
        TSData.push(createSeriesObj(
          TITLES.legend[key],
          YoYData[key],
          '%',
          true
        ));
      });
  
      return TSData;

      function getYoYPercChangesData() {
        var getNewDataObj = require('./getNewDataObj.js');
        var YoYChangesDataObj = getNewDataObj(false);

        for (var j = 0; j < IPODATA.years.length - 1; j++) {
          _.keys(YoYChangesDataObj).forEach(function(key) {
            YoYChangesDataObj[key].push(
              getPercDiff(IPODATA[key][j], IPODATA[key][j+1])
            );
          });
        }
    
        return YoYChangesDataObj;
    
        function getPercDiff(val1, val2) {
          return Math.round(100.0 * (val2 - val1) / val1) / 100.0;
        }
      }
    }
  }
}

module.exports = handleSelectYoYGrowthTimeSeries;
