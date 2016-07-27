function handleSelectRegressionWithScatterPlot() {
  var techSeriesData = create2DDataArray(
    IPODATA.techIPOs,
    IPODATA.techNumProfit
  );
  var otherSeriesData = create2DDataArray(
    IPODATA.otherIPOs,
    IPODATA.otherNumProfit,
    false
  );

  return renderTechAndOtherRegressionCharts(techSeriesData, otherSeriesData);

  function create2DDataArray(xData, yData, isTech = true) {
    var color = getPointColorRGB(isTech);
    var dataArray = [];
    for (var k = 0; k < xData.length; k++) {
      // dataArray.push([xData[k], yData[k]]);
      dataArray.push({
        x: xData[k],
        y: yData[k],
        marker: { fillColor: color }
      });
    }
    return dataArray;

    function getPointColorRGB(isTech) {
      return !isTech ? 'rgb(252, 59, 58)' : 'rgb(108, 207, 255)';
    }
  }

  function renderTechAndOtherRegressionCharts(techSeriesData, otherSeriesData) {
    $('#chart').empty();
    $('#chart').append('<div id="chart_1"></div>');
    $('#chart').append('<div id="chart_2"></div>');
    $('#chart_1').highcharts(getOptionsData(techSeriesData));
    $('#chart_2').highcharts(getOptionsData(otherSeriesData, false));

    function getOptionsData(seriesData, isTech = true) {
      var type = getKeyFromType(isTech);
      return getRegressionOptionsObj(
        seriesData,
        TITLES[getKeyFromType(isTech)] + ': ' + TITLES.IPO + ' VS. ' + 'Number Profitable by Year',
        getTimeRangeStr(),
        TITLES.IPO,
        TITLES.numProft,
        'polynomial', //,
        getLineColorRGB(isTech)
      );

      function getLineColorRGB(isTech) {
        // 'rgb(64, 124, 153)'
        return isTech ? 'rgb(0, 0, 0)' : 'rgb(126, 29, 29)';
      }

      function getKeyFromType(isTech) {
        return isTech ? 'tech' : 'other';
      }

      function getRegressionOptionsObj(
        seriesDataArray,
        title,
        subtitle,
        xTitle,
        yTitle,
        regressionType = 'linear',
        legendCoordinates = [120, 100],
        color //= 'rgb(126, 29, 29)'
      ) {
        return {
          chart: { type: 'scatter', zoomType: 'xy' },
          // colors: color, // ,'#6ccfff','#7e1d1d','#fc3b3a'],
          title: { 
            text: title , 
            style: { color: color, font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
           },
          subtitle: { text: subtitle },
          xAxis: {
            title: { enabled: true, text: xTitle },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
          },
          yAxis: { title: { text: yTitle } },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: '#FFFFFF',
            borderWidth: 1
          },
          plotOptions: {
            scatter: {
              marker: {
                radius: 5,
                states: { 
                  hover: {
                    enabled: true, 
                    lineColor: color,
                  }, 
                },
              },
              states: { hover: { marker: { enabled: false } } },
              tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x}, {point.y}'
              },
            },
          },
          series: [{
            regression: true,
            regressionSettings: {
              type: regressionType,
              color: color,
            },
            name: TITLES.years,
            color: color,
            data: seriesDataArray,
          }]
        };
      }
    }
  }
}
