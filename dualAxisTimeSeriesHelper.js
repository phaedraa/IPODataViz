function handleSelectDualAxisTimeSeries(event) {
  var TSData = [];
  _.keys(IPODATA).forEach(function(key) {
      switch(key) {
        case 'techPercProfits':
        case 'otherPercProfits':
          TSData.push(createSeriesObj(
            TITLES.legend[key],
            IPODATA[key],
            '%',
            false,
            'spline',
            1
          ));
          break;
        case 'techIPOs':
        case 'otherIPOs':
          TSData.push(createSeriesObj(
            TITLES.legend[key],
            IPODATA[key],
            '',
            false,
            'column'
          ));
          break;
      }
  });
  
  var options = getDualAxisOptionsObj(
    IPODATA.years,
    TSData,
    TITLES.IPO + '& ' + TITLES.percProfit,
    getDefaultDualAxisSubtitle(),
    TITLES.IPO,
    TITLES.percProfit,
    [IPODATA.years.length * 25, 0],
    '',
    '%',
    '',
    400,
    100
  );
  
  return $('#chart').highcharts(options);
}
