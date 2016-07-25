$(document).ready(function() {
  assignListeners();

  function assignListeners() {
    $('#view_details_1').bind('click', handleSelectMovingAvgDualAxisTimeSeries);
    $('#view_details_2').bind('click', handleSelectDualAxisTimeSeries);
    $('#view_details_3').bind('click', handleSelectYoYSinglelAxisTimeSeries);
    $('#view_details_4').bind('click', handleSelectRegressionTimeSeries);
    $('#view_details_5').bind('click', handleSelectDecadeDualAxisTimeSeries);
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
  legendCoordinates = [120, 100],
  y1LabelSymbol = '',
  y2LabelSymbol = '',
  xLabelSymbol = '',
  y1Max = null,
  y2Max = null
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
      max: y1Max,
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
      max: y2Max,
    }],
    tooltip: { shared: true },
    legend: {
      layout: 'vertical',
      align: 'right',
      // x: legendCoordinates[0],
      verticalAlign: 'top',
      // y: legendCoordinates[1],
      floating: true,
      backgroundColor: (
        Highcharts.theme && Highcharts.theme.legendBackgroundColor
      ) || '#FFFFFF'
    },
    series: seriesData,
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
