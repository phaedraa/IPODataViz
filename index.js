$(document).ready(function() {
  assignListeners();

  function assignListeners() {
    $('#view_details_1').bind('click', handleSelectMovingAvgTimeSeries);
    $('#view_details_2').bind('click', handleSelectDualAxisTimeSeries);
    $('#view_details_3').bind('click', handleSelectYoYGrowthTimeSeries);
    $('#view_details_4').bind('click', handleSelectRegressionWithScatterPlot);
    $('#view_details_5').bind('click', handleSelectDecadeBarGraph);
    $('#view_details_6').bind('click', handleSelectHistoricalSummaries);
  }
});

function getDefaultDualAxisSubtitle() {
  return 'Split by ' + TITLES.tech + ' and ' + TITLES.other;
}

function getTimeRangeStr() {
  return IPODATA.years[0] + ' - ' + IPODATA.years[IPODATA.years.length - 1];
}

function getDualAxisOptionsObj(
  xAxisData,
  seriesData,
  title,
  subtitle,
  y1Title,
  y2Title,
  legendCoordinates = [15, 20],
  y1LabelSymbol = '',
  y2LabelSymbol = '',
  xLabelSymbol = ''
) {
  return {
    chart: { zoomType: 'xy', alignTicks: false },
    title: { text: title },
    subtitle: {text: subtitle },
    xAxis: [{ categories: xAxisData, crosshair: true }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}' + y1LabelSymbol,
        style: { color: Highcharts.getOptions().colors[1] }
      },
      title: {
        text: y1Title,
        style: { color: Highcharts.getOptions().colors[1] }
      },
    }, { // Secondary yAxis
      title: {
        text: y2Title, 
        style: { color: Highcharts.getOptions().colors[1] },
      },
      labels: {
        format: '{value}' + y2LabelSymbol,
        style: { color: Highcharts.getOptions().colors[0] }
      },
      opposite: true,
    }],
    tooltip: { shared: true },
    legend: {
      x: legendCoordinates[0],
      y: legendCoordinates[1],
      floating: true,
      backgroundColor: (
        Highcharts.theme && Highcharts.theme.legendBackgroundColor
      ) || '#FFFFFF'
    },
    series: seriesData,
  };
}

function getSingleAxisOptionsObj(
    xAxisDataArray,
    seriesDataArray,
    title,
    subtitle,
    y1Title,
    legendCoordinates = [15, 20],
    y1LabelSymbol = '',
    xLabelSymbol = ''
  ) {
    return {
      title: { text: title, x: -20 /*center*/ },
      subtitle: { text: subtitle, x: -20 },
      xAxis: { categories: xAxisDataArray },
      yAxis: {
        labels: { format: '{value}' + y1LabelSymbol },
        title: { text: y1Title },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: { valueSuffix: y1LabelSymbol },
      legend: {
        x: legendCoordinates[0],
        y: legendCoordinates[1],
        borderWidth: 0
      },
      series: seriesDataArray,
    };
  }

function createSeriesObj(
  name,
  dataArray,
  valueSuffix = '',
  isSingleAxis = false,
  chartType = 'spline',
  yAxis = null
) {
  var seriesObj = {
    name: name,
    data: dataArray,
    tooltip: {valueSuffix: valueSuffix}
  };

  if (!isSingleAxis) {
    seriesObj.type = chartType;
    if (yAxis !== null) {
      seriesObj.yAxis = yAxis;
    }
  }

  return seriesObj;
}
