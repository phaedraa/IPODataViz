function handleSelectHistoricalSummaries () {
  var totalsData = getTotalsData();
  var options = getPieChartOptionsObj(
  	'Number IPOs & Profitability by Sector ' + getTimeRangeStr(),
  	totalsData
  );

  return $('#chart').highcharts(options);

  function getTotalsData() {
    var totals = {};
    _.keys(getNewDataObj(false)).forEach(function(key) {
      totals[key] = totalArray(IPODATA[key]);
    });
    return [
      [TITLES.tech + '- Not Profitable',
        totals.techIPOs - totals.techNumProfit],
      [TITLES.tech + '- Profitable', totals.techNumProfit],
      [TITLES.other + '- Not Profitable',
        totals.otherIPOs - totals.otherNumProfit],
      [TITLES.other + '- Profitable', totals.otherNumProfit],
    ];
  }

  function getPieChartOptionsObj(title, seriesData) {
  	return {
      chart: {
        type: 'pie',
        options3d: { enabled: true, alpha: 45, beta: 0 } 
      },
      title: { text: title },
      tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: { enabled: true, format: '{point.name}' }
        }
      },
      series: [{ type: 'pie', name: 'Browser share', data: seriesData }]
    }
  }
}