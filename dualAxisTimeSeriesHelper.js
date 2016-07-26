function handleSelectDualAxisTimeSeries(event) {
  var options = getDualAxisOptionsObj(
    IPODATA.years,
    getSeriesData(),
    TITLES.IPO + ' & ' + TITLES.percProfit,
    getDefaultDualAxisSubtitle(),
    TITLES.IPO,
    TITLES.percProfit,
    [IPODATA.years.length / 2, 20],
    '',
    '%'
  );
  
  return $('#chart').highcharts(options);

  function getSeriesData() {
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
    return TSData;
  }
}
