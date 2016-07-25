function handleSelectRegressionTimeSeries() {
  var techSeriesData = create2DDataArray(
    IPODATA.techIPOs,
    IPODATA.techNumProfit
  );
  var otherSeriesData = create2DDataArray(
    IPODATA.otherIPOs,
    IPODATA.otherNumProfit
  );

  return renderTechAndOtherRegressionCharts(techSeriesData, otherSeriesData);

  function renderTechAndOtherRegressionCharts(techSeriesData, otherSeriesData) {
    $('#chart').empty();
    $('#chart').append('<div id="chart_1"></div>');
    $('#chart').append('<div id="chart_2"></div>');
    $('#chart_1').highcharts(getOptionObj(techSeriesData, 'tech'));
    $('#chart_2').highcharts(getOptionObj(otherSeriesData, 'other'));
  }
  
  function getOptionObj(seriesData, type) {
    return getRegressionOptionsObj(
      seriesData,
      TITLES[type] + ': ' + TITLES.IPO + ' VS. ' + 'Number Profitable by Year',
      getTimeRangeStr(),
      TITLES.IPO,
      TITLES.numProft,
      'polynomial'
    );
  }

  function create2DDataArray(xData, yData) {
    var dataArray = [];
    for (var k = 0; k < xData.length; k++) {
      dataArray.push([xData[k], yData[k]]);
    }
    return dataArray;
  }

  function getRegressionOptionsObj(
    seriesDataArray,
    title,
    subtitle,
    xTitle,
    yTitle,
    regressionType = 'linear',
    legendCoordinates = [120, 100]
  ) {
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
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: '#FFFFFF',
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: { hover: { enabled: true, lineColor: 'rgb(100,100,100)' } }
          },
          states: { hover: { marker: { enabled: false } } },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x}, {point.y}'
          }
        }
      },
      series: [{
        regression: true,
        regressionSettings: {
          type: regressionType,
          color:  'rgba(223, 83, 83, .9)'
        },
        name: TITLES.years,
        color: 'rgba(223, 83, 83, .5)',
        data: seriesDataArray,
      }]
    };
  }
}
