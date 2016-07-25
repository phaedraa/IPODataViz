function handleSelectYoYSinglelAxisTimeSeries(event) {
  var MAP = {
      techPercProfits: 'techNumProfit',
      otherPercProfits: 'otherNumProfit'
    };
  var YoYData = getYoYPercChangesData();
  var TSData = [];
  _.keys(YoYData).forEach(function(key) {
    TSData.push(createSeriesObj(
      TITLES.legend[getSwitchedKey(key)],
      YoYData[key],
      '%',
      true
    ));
  });

  var options = getSingleAxisOptionsObj(
    IPODATA.years.slice(1),
    TSData,
    'Year Over Year % Changes in IPOs & ' + TITLES.percProfit,
    '',
    'YoY Changes (%)',
    [IPODATA.years.length * 10, 10],
    '%'
  );
  return $('#chart').highcharts(options);

  function getPercDiff(val1, val2) {
    return Math.round(100.0 * (val2 - val1) / val1) / 100.0;
  }

  function getYoYPercChangesData() {
    var YoYChangesDataObj = getNewDataObj();
    for (var j = 0; j < IPODATA.years.length - 1; j++) {
      _.keys(YoYChangesDataObj).forEach(function(key) {
        var mappedKey = getSwitchedKey(key);
        YoYChangesDataObj[key].push(
          getPercDiff(IPODATA[mappedKey][j], IPODATA[mappedKey][j+1])
        );
      });
    }

    return YoYChangesDataObj;
  }

  function getSwitchedKey(key) {
    return MAP[key] || key;
  }

  function getSingleAxisOptionsObj(
    xAxisDataArray,
    seriesDataArray,
    title,
    subtitle,
    y1Title,
    legendCoordinates = [120, 100],
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
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080'
          },
        ]
      },
      tooltip: { valueSuffix: y1LabelSymbol },
      legend: {
        verticalAlign: 'right',
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'right',
        borderWidth: 0
      },
      series: seriesDataArray,
    };
  }
}
