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