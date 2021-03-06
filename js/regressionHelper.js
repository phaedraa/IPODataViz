function handleSelectRegressionWithScatterPlot() {
  var parsedData = require('./dataHelper.js');
  var TITLES = parsedData.TITLES;
  var IPODATA = parsedData.IPODATA;
  var techSeriesData = create2DDataArray(
    IPODATA.techIPOs,
    IPODATA.techNumProfit
  );
  var otherSeriesData = create2DDataArray(
    IPODATA.otherIPOs,
    IPODATA.otherNumProfit,
    false
  );

  return renderTechAndOtherRegressionCharts(techSeriesData, otherSeriesData);

  function create2DDataArray(xData, yData, isTech = true) {
    var color = getPointColorRGB(isTech);
    var dataArray = [];
    for (var k = 0; k < xData.length; k++) {
      dataArray.push({
        x: xData[k],
        y: yData[k],
        marker: { fillColor: color }
      });
    }
    return dataArray;

    function getPointColorRGB(isTech) {
      return !isTech ? 'rgb(252, 59, 58)' : 'rgb(108, 207, 255)';
    }
  }

  function renderTechAndOtherRegressionCharts(techSeriesData, otherSeriesData) {
    $('#chart').empty();
    $('#chart').append('<div id="chart_1"></div>');
    $('#chart').append('<div id="chart_2"></div>');
    $('#chart_1').highcharts(getOptionsData(techSeriesData));
    $('#chart_2').highcharts(getOptionsData(otherSeriesData, false));

    function getOptionsData(seriesData, isTech = true) {
      var title = TITLES[getKeyFromType(isTech)] + ': ' + TITLES.IPO + ' VS. ' + 'Number Profitable by Year';
      var subtitle = require('./getTimeRangeStr.js')();
      var xTitle = TITLES.IPO;
      var yTitle = TITLES.numProft;
      var regressionType = 'polynomial';
      var legendCoordinates = [IPODATA.years.length / 2, 15];
      var color = getLineColorRGB(isTech);
      
      return {
        chart: { type: 'scatter', zoomType: 'xy' },
        title: { text: title },
        subtitle: { text: subtitle },
        xAxis: {
          title: { enabled: true, text: xTitle },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        yAxis: { title: { text: yTitle } },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: legendCoordinates[0],
          y: legendCoordinates[1],
          floating: true,
          backgroundColor: '#FFFFFF',
          borderWidth: 1
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 5,
              states: { 
                hover: {
                  enabled: true, 
                  lineColor: color,
                }, 
              },
            },
            states: { hover: { marker: { enabled: false } } },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x}, {point.y}'
            },
          },
        },
        series: [{
          regression: true,
          regressionSettings: {
            type: regressionType,
            color: color,
          },
          name: TITLES.years,
          color: color,
          data: seriesData,
        }]
      };

      function getLineColorRGB(isTech) {
        return isTech ? 'rgb(0, 0, 0)' : 'rgb(126, 29, 29)';
      }

      function getKeyFromType(isTech) {
        return isTech ? 'tech' : 'other';
      }
    }
  }
}

module.exports = handleSelectRegressionWithScatterPlot;
