function handleSelectDecadeBarGraph(event) {
  return $('#chart').highcharts(getOptionsData());

  function getOptionsData() {
    var decadeData = getDecadeData();
    var pasedData = require('./dataHelper.js');
    var getTimeRangeStr = require('./getTimeRangeStr.js');
    var TITLES = parsedData.TITLES;
    var IPODATA = parsedData.IPODATA;
    var getDefaultDualAxisSubtitle = require('./getDefaultDualAxisSubtitle.js');

    return getMultiColumnOptionsObj(
      decadeData.years,
      getSeriesData(decadeData),
      'IPOs Throughout the Decades (' + getTimeRangeStr() + ')',
      getDefaultDualAxisSubtitle(),
      'Num IPOs',
      TITLES.years,
      TITLES.IPO
    );

    function getSeriesData() {
      var TSData = [];
      // Not ideal, but fastest solution ATM to enable ordered bar graph
      var orderedKeys = [
        'techIPOs', 
        'techNumProfit', 
        'otherIPOs', 
        'otherNumProfit'
      ];
      var createSeriesObj = require('./createSeriesObj.js');

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
      var decadeDataObj = getNewDataObjWithYears();
      var decadeDatum = getNewDataObjWithYears();
      var len = IPODATA.years.length;
      for (var i = 0; i < len; i++) {
        _.keys(decadeDataObj).forEach(function(key) {
        	if (isDecade(i + 1, len)) {
            decadeDatum[key].push(IPODATA[key][i]);
        	  decadeDataObj[key].push(getDecadeXorYValue(key, decadeDatum[key]));
        	  decadeDatum[key] = [];
        	} else {
        	  decadeDatum[key].push(IPODATA[key][i]);
        	}
        });
      }
  
      return decadeDataObj;
  
      function getNewDataObjWithYears(profitTypeIsPercent = false) {
        var getNewDataObj = require('./getNewDataObj.js');
        var dataObj = getNewDataObj(profitTypeIsPercent);
        dataObj['years'] = [];
        return dataObj;
      }
  
      function isDecade(idx, max) {
        return idx % 10 === 0 || idx === max - 1;
      }
  
      function getDecadeXorYValue(key, decadeData) {
        if (key === 'years') {
          return getDecadeRangeStr(decadeData);
        }
        return getDecadeAvg(decadeData);
      }
  
      function getDecadeRangeStr(decade) {
        return parseInt(decade[0]) + ' - ' + decade[decade.length - 1];
      }
  
      function getDecadeAvg(decade) {
        var totalArray = require('./totalArray.js');
        return Math.floor(100 * totalArray(decade) / totalArray.length) / 100.0;
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
        colors: ['#407c99','#6ccfff','#7e1d1d','#fc3b3a'],
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
}

module.exports = handleSelectDecadeBarGraph;

