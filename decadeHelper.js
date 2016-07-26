function handleSelectDecadeDualAxisTimeSeries(event) {
  var options = getMultiColumnOptionsObj(
    getYearsData(IPODATA.years),
    getSeriesData(),
    'IPOs Throughout the Decades (' + getTimeRangeStr() + ')',
    getDefaultDualAxisSubtitle(),
    'Num IPOs',
    TITLES.years,
    TITLES.IPO
  );

  return $('#chart').highcharts(options);

  function getSeriesData() {
    var decadeData = getDecadeData();
    var TSData = [];
    // Not ideal, but fastest solution ATM to enable ordered display in graph
    var orderedKeys = [
      'techIPOs', 
      'techNumProfit', 
      'otherIPOs', 
      'otherNumProfit'
    ];
    orderedKeys.forEach(function(key) {
      TSData.push(createSeriesObj(
        TITLES.legend[key],
        decadeData[key],
        '',
        false,
        'column'
      ));
    });

    return TSData;
  }

  function getDecadeData() {
    var decadeDataObj = getNewDataObj(false);
    var decadeDatum = getNewDataObj(false);
    var len = IPODATA.years.length;
    for (var i = 0; i < len; i++) {
      _.keys(decadeDataObj).forEach(function(key) {
      	if (isDecade(i + 1, len)) {
      	  decadeDataObj[key].push(getDecadeAvg(decadeDatum[key]));
      	  decadeDatum[key] = [];
      	} else {
      	  decadeDatum[key].push(IPODATA[key][i]);
      	}
      });
    }

    return decadeDataObj;
  }

  function isDecade(idx, max) {
  	return idx % 10 === 0 || idx === max - 1;
  }

  function getDecadeAvg(decade) {
    return Math.floor(100 * totalArray(decade) / totalArray.length) / 100.0;
  }


  function getYearsData(years) {
  	var decadeTemp = [];
    var decadeRanges = [];
  	years.forEach(function(year, i) {
 	    if (isDecade(i + 1, years.length)) {
 	    	decadeTemp.push(year);
 	    	decadeRanges.push(getDecadeRangeStr(decadeTemp));
        decadeTemp = [];
 	    } else {
 	    	decadeTemp.push(year);
 	    }
  	});

    return decadeRanges;

  	function getDecadeRangeStr(decade) {
  	  return parseInt(decade[0]) + ' - ' + decade[decade.length - 1];
  	}
  }

  function getMultiColumnOptionsObj(
    xAxisData,
    seriesData,
    title,
    subtitle,
    yTitle,
    xTitle
  ) {
    return { 
      chart: { type: 'column' },
      title: { text: title },
      subtitle: { text: subtitle },
      xAxis: { categories: xAxisData, crosshair: true, title: { text: xTitle }},
      yAxis: { min: 0, title: { text: yTitle } },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};' +
          'padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
      series: seriesData
    };
  }
}
