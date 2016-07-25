function handleSelectHistoricalSummaries () {
  var MAP = {
    techPercProfits: 'techNumProfit',
    otherPercProfits: 'otherNumProfit'
  };
  var totalsData = getTotalsData();
  console.log(totalsData);
  var options = getPieChartOptionsObj(
  	'Number IPOs & Profitability by Sector ' + getTimeRangeStr(),
  	totalsData
  );

  return $('#chart').highcharts(options);

  function getTotalsData() {
    var pieChartData = [];
    var totals = {};
    _.keys(getNewDataObj()).forEach(function(key) {
	  var mappedKey = getSwitchedKey(key);
      totals[mappedKey] = totalArray(IPODATA[mappedKey]);
    });
    pieChartData = [
      [TITLES.tech + '- Not Profitable', totals.techIPOs - totals.techNumProfit],
      [TITLES.tech + '- Profitable', totals.techNumProfit],
      [TITLES.other + '- Not Profitable', totals.otherIPOs - totals.otherNumProfit],
      [TITLES.other + '- Profitable', totals.otherNumProfit],
    ];
    return pieChartData;
  }

  function totalArray(data) {
  	var sum = 0;
  	var l = data.length;
    for (var i = 0; i < l; i++) {
      sum += data[i];
    }
  	return sum;
  }


  function getSwitchedKey(key) {
    return MAP[key] || key;
  }

  function getPieChartOptionsObj(title, seriesData) {
  	return {
      chart: {
        type: 'pie',
        options3d: { enabled: true, alpha: 45, beta: 0 } },
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
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: seriesData,
      }]
    }
  }
}