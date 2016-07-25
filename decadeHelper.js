function handleSelectDecadeDualAxisTimeSeries(event) {
  var MAP = {
    techPercProfits: 'techNumProfit',
    otherPercProfits: 'otherNumProfit'
  };
  var decadeData = getDecadeData();
  var TSData = [];
  _.keys(decadeData).forEach(function(key) {
    TSData.push(createSeriesObj(
      TITLES.legend[getSwitchedKey(key)],
      decadeData[key],
      '',
      false,
      'column'
    ));
  });

  var options = getDualAxisOptionsObj(
    getYearsData(IPODATA.years),
    TSData,
    'IPOs Throughout the Decades (' + getTimeRangeStr() + ')',
    getDefaultDualAxisSubtitle(),
    TITLES.numProft,
    TITLES.IPO,
    [IPODATA.years.length * 25, 0],
  	'',
  	'',
  	'',
  	null,
  	null,
  	'category'
  );

  return $('#chart').highcharts(options);

  function getDecadeData() {
    var decadeDataObj = getNewDataObj();
    var decadeDatum = getNewDataObj();
    // decadeDataObj.years = [];
    // decadeDatum.years = [];
    var len = IPODATA.years.length;
    
    for (var i = 0; i < len; i++) {
      _.keys(decadeDataObj).forEach(function(key) {
      	var mappedKey = getSwitchedKey(key);
      	if (isDecade(i + 1, len)) {
      	  decadeDataObj[key].push(getDecadeAvg(decadeDatum[key]));
      	  decadeDatum[key] = [];
      	} else {
      	  decadeDatum[key].push(IPODATA[mappedKey][i]);
      	}
      });
    }

    return decadeDataObj;
  }

  function getSwitchedKey(key) {
    return MAP[key] || key;
  }

  function isDecade(idx, max) {
  	return idx % 10 === 0 || idx === max - 1;
  }

  function getDecadeAvg(decade) {
    return Math.floor(100 * totalArray(decade) / totalArray.length) / 100.0;
  }

  function totalArray(data) {
  	var sum = 0;
  	var l = data.length;
    for (var i = 0; i < l; i++) {
      sum += data[i];
    }
  	return sum;
  }

  function getYearsData(years) {
  	var decade = [];
  	return years.map(function(year, i) {
 	  if (isDecade(i + 1, years.length)) {
 	  	decade.push(year);
 	  	var decadeStr = getDecadeRangeStr(decade);
 	  	console.log(decadeStr);
 	  	decade = [];
 	  	return decadeStr;
 	  } else {
 	  	decade.push(year);
 	  }
  	});

  	function getDecadeRangeStr(decade) {
  	  console.log(decade);
  	  return parseInt(decade[0]); // + ' - ' + decade[decade.length - 1];
  	}
  }
}
