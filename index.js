var IPO_DATA_CSV = "/TheInformation_DataStoryteller_02222016-3.csv";

$(document).ready(function() { 
    var _TITLES = {IPOTitle: '', percProfitTitle: '', techTitle: '', otherTitle: '', yearsTitle: ''};
        RAW_DATA = getNewDataObj();

    Papa.parse(IPO_DATA_CSV, {
      download: true,
      complete: function(results) {
        parseData(results.data);
      }
    });

    function parseData(IPOData) {

      function getTotalFromPerc(totalStr, percentStr) {
        console.log('totalStr', totalStr);
        console.log('percentStr', percentStr);
        var val = Math.floor(
          parseInt(totalStr) * (parseInt(percentStr) / 100.0)
        );
        console.log('val', val);
        return val;
      }

      _TITLES.IPOTitle = IPOData[1][1];
      _TITLES.percProfitTitle = IPOData[1][2];
      _TITLES.techTitle = IPOData[0][1];
      _TITLES.otherTitle = IPOData[0][3];
      _TITLES.yearsTitle = IPOData[1][0];
      IPOData = IPOData.slice(2);
      
      RAW_DATA.techNumProfit = [];
      RAW_DATA.otherNumProfit = [];
      for(var i=0; i<IPOData.length; i++) {
        RAW_DATA.years.push(IPOData[i][0]);
        RAW_DATA.techIPOs.push(parseInt(IPOData[i][1]));
        RAW_DATA.techPercProfits.push(parseInt(IPOData[i][2]));
        RAW_DATA.otherIPOs.push(parseInt(IPOData[i][3]));
        RAW_DATA.otherPercProfits.push(parseInt(IPOData[i][4]));
        RAW_DATA.techNumProfit.push(getTotalFromPerc(IPOData[i][1], IPOData[i][2]))
        RAW_DATA.otherNumProfit.push(getTotalFromPerc(IPOData[i][3], IPOData[i][4]));
      }
      console.log(RAW_DATA);
    }

    $('#view_details_1').bind('click', handleSelectMovingAvgDualAxisTimeSeries);
    $('#view_details_2').bind('click', handleSelectDualAxisTimeSeries);
    $('#view_details_3').bind('click', handleSelectYoYSinglelAxisTimeSeries);
    $('#view_details_4').bind('click', handleSelectLinearRegressionTimeSeries);

    function getNewDataObj() {
      return {
        years: [],
        techIPOs: [],
        techPercProfits: [],
        otherIPOs: [],
        otherPercProfits: [],
      };
    }

    function handleSelectLinearRegressionTimeSeries(type = _TITLES.techTitle) {
      var seriesData = create2DDataArray(RAW_DATA.techIPOs, RAW_DATA.techNumProfit);
      console.log('seriesData', seriesData);
      var options = getRegressionOptionsObj(
        seriesData,
        _TITLES.IPOTitle + ' VS. ' + 'Number Profitable by Year',
        RAW_DATA.years[0] + ' - ' + RAW_DATA.years[RAW_DATA.years.length - 1],
        _TITLES.IPOTitle,
        'Number Profitable',
        // 'exponential' 0.06
        'polynomial'// 0.63
        // 'logarithmic' 0.51
      );

      return $('#chart').highcharts(options);
    }

    function handleSelectMovingAvgDualAxisTimeSeries(event) {
      
      function getMovingAvg(currAvgArray, nextVal) {
        var size = currAvgArray.length;
        if (size === 0) {
          return nextVal;
        }
        var nextAvg = (currAvgArray[size - 1] * size + nextVal) / (size + 1);
        
        return Math.round(100 * nextAvg) / 100.0;
      }

      function getMovingAvgData() {
        var MovingAvgDataObj = getNewDataObj();

        for (var j=0; j<RAW_DATA.years.length; j++) {
          MovingAvgDataObj.techIPOs.push(
            getMovingAvg(MovingAvgDataObj.techIPOs, RAW_DATA.techIPOs[j])
          );
          MovingAvgDataObj.techPercProfits.push(
            getMovingAvg(MovingAvgDataObj.techPercProfits, RAW_DATA.techPercProfits[j])
          );
          MovingAvgDataObj.otherIPOs.push(
            getMovingAvg(MovingAvgDataObj.otherIPOs, RAW_DATA.otherIPOs[j])
          );
          MovingAvgDataObj.otherPercProfits.push(
            getMovingAvg(MovingAvgDataObj.otherPercProfits, RAW_DATA.otherPercProfits[j])
          );
        }

        return MovingAvgDataObj;
      }

      var mvgAvgData = getMovingAvgData();
      var TSData = [];
      
      TSData.push(createSeriesObj(
        _TITLES.techTitle + ' - ' + _TITLES.IPOTitle,
        mvgAvgData.techIPOs
      ));
      TSData.push(createSeriesObj(
        _TITLES.otherTitle + ' - ' + _TITLES.IPOTitle,
        mvgAvgData.otherIPOs
      ));
      TSData.push(createSeriesObj(
        _TITLES.techTitle + ' - ' + _TITLES.percProfitTitle,
        mvgAvgData.techPercProfits,
        '%'
      ));
      TSData.push(createSeriesObj(
        _TITLES.otherTitle + ' - ' + _TITLES.percProfitTitle,
        mvgAvgData.otherPercProfits,
        '%'
      ));

      var options = getDualAxisOptionsObj(
        RAW_DATA.years,
        TSData,
        'Moving Averages of ' + _TITLES.IPOTitle + ' & ' + _TITLES.percProfitTitle,
         getDefaultDualAxisSubtitle(),
        _TITLES.percProfitTitle + ' Moving Avg',
        _TITLES.IPOTitle + ' Moving Avg',
        [RAW_DATA.years.length * 25, 0],
        '%',
        ''
      );

      return $('#chart').highcharts(options);
    }

    function handleSelectYoYSinglelAxisTimeSeries(event) {
      
      function getPercDiff(val1, val2) {
        return Math.round(100.0 * (val2 - val1) / val1) / 100.0;
      }

      function getYoYPercChangesData() {
        var YoYChangesDataObj = getNewDataObj();
        
        for(var j=0; j<RAW_DATA.years.length - 1; j++) {
          YoYChangesDataObj.techIPOs.push(
            getPercDiff(RAW_DATA.techIPOs[j], RAW_DATA.techIPOs[j+1])
          );
          YoYChangesDataObj.techPercProfits.push(
            getPercDiff(RAW_DATA.techNumProfit[j], RAW_DATA.techNumProfit[j+1])
          );
          YoYChangesDataObj.otherIPOs.push(
            getPercDiff(RAW_DATA.otherIPOs[j], RAW_DATA.otherIPOs[j+1])
          );
          YoYChangesDataObj.otherPercProfits.push(
            getPercDiff(RAW_DATA.otherNumProfit[j], RAW_DATA.otherNumProfit[j+1])
          );
        }

        return YoYChangesDataObj;
      }

      var YoYData = getYoYPercChangesData();
      var TSData = [];

      TSData.push(createSeriesObj(
        _TITLES.techTitle + '-' + 'Num. Profitable' +  ' - Delta',
        YoYData.techPercProfits,
        '%',
        true
      ));
      TSData.push(createSeriesObj(
        _TITLES.techTitle + '-' + _TITLES.IPOTitle + ' - Delta',
        YoYData.techIPOs,
        '%',
        true
      ));
      TSData.push(createSeriesObj(
        _TITLES.otherTitle + '-' + 'Num. Profitable' + ' - Delta',
        YoYData.otherPercProfits,
        '%',
        true
      ));
      TSData.push(createSeriesObj(
        _TITLES.otherTitle + '-' + _TITLES.IPOTitle + ' - Delta',
        YoYData.otherIPOs,
        '%',
        true
      ));

      console.log('data', TSData);
      var options = getSingleAxisOptionsObj(
        RAW_DATA.years.slice(1),
        TSData,
        'Year Over Year % Changes in IPOs & ' + _TITLES.percProfitTitle,
        '',
        'YoY Changes (%)',
        [RAW_DATA.years.length * 10, 10],
        '%'
      );
      console.log(options);
      return $('#chart').highcharts(options);
    }

    function handleSelectDualAxisTimeSeries(event) {
      var TSData = [];
      TSData.push(createSeriesObj(
        _TITLES.techTitle + '- ' + _TITLES.percProfitTitle,
        RAW_DATA.techPercProfits,
        '%',
        false,
        'spline',
        1
      ));
      TSData.push(createSeriesObj(
        _TITLES.otherTitle + '- ' + _TITLES.percProfitTitle,
        RAW_DATA.otherPercProfits,
        '%',
        false,
        'spline',
        1
      ));
      TSData.push(createSeriesObj(
        _TITLES.techTitle + '- ' + _TITLES.IPOTitle,
        RAW_DATA.techIPOs,
        '',
        false,
        'column'
      ));
      TSData.push(createSeriesObj(
        _TITLES.otherTitle + '- ' + _TITLES.IPOTitle,
        RAW_DATA.otherIPOs,
        '',
        false,
        'column'
      ));

      var options = getDualAxisOptionsObj(
        RAW_DATA.years,
        TSData,
        _TITLES.IPOTitle + '& ' + _TITLES.percProfitTitle,
        getDefaultDualAxisSubtitle(),
        _TITLES.IPOTitle,
        _TITLES.percProfitTitle,
        [RAW_DATA.years.length * 25, 0],
        '',
        '%',
        '',
        400,
        100
      );

      return $('#chart').highcharts(options);
    }

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

    // function handleSelectTimeSeries(event) {
    //   var TSData = [];
    //   TSData.push(createSeriesObj(techData.title,techData.numIPOs, '', false));
    //   TSData.push(createSeriesObj(otherData.title, otherData.numIPOs, '', false));
    //   var optionsTS = getSingleAxisOptionsObj(
    //     RAW_DATA.years,
    //     TSData,
    //     _TITLES.IPOTitle,
    //     '',
    //     _TITLES.IPOTitle
    //   );
    //   return $('#chart').highcharts(optionsTS);
    // }

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
        title: {text: title, x: -20 /*center*/},
        subtitle: {text: subtitle, x: -20},
        xAxis: {categories: xAxisDataArray},
        yAxis: {labels: {format: '{value}' + y1LabelSymbol},
          title: {text: y1Title}, 
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          },
        ]},
        tooltip: {valueSuffix: y1LabelSymbol},
        legend: {
          // x: 250,// legendCoordinates[0],
          verticalAlign: 'right',
          // y: 25, //legendCoordinates[1],
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'right',
          borderWidth: 0
        },
        series: seriesDataArray,
      };
    }

    function getDefaultDualAxisSubtitle() {
      return 'Split by ' + _TITLES.techTitle + ' and ' + _TITLES.otherTitle;
    }

    function getDualAxisOptionsObj(
      xAxisDataArray,
      seriesDataArray,
      title,
      subtitle,
      y1Title,
      y2Title,
      legendCoordinates = [120, 100],
      y1LabelSymbol = '',
      y2LabelSymbol = '',
      xLabelSymbol = '',
      y1Max = null,
      y2Max = null
    ) {
      return {
        chart: {zoomType: 'xy', alignTicks:false},
        title: {text: title},
        subtitle: {text: subtitle},
        xAxis: [{categories: xAxisDataArray, crosshair: true}],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}'+y1LabelSymbol,
                style: {color: Highcharts.getOptions().colors[1]}
            },
            title: {
                text: y1Title,
                style: {color: Highcharts.getOptions().colors[1]}
            },
            max: y1Max, 
        }, { // Secondary yAxis
            title: {
                text: y2Title,
                style: {color: Highcharts.getOptions().colors[1]},
            },
            labels: {
                format: '{value}'+y2LabelSymbol,
                style: {color: Highcharts.getOptions().colors[0]}
            },
            opposite: true,
            max: y2Max,
        }],
        tooltip: {shared: true},
        legend: {
            layout: 'vertical',
            align: 'left',
            // x: legendCoordinates[0],
            verticalAlign: 'top',
            // y: legendCoordinates[1],
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: seriesDataArray,
      };
    }

    function create2DDataArray(xDataArray, yDataArray) {
      var dataArray = [];
      for (var k=0; k<xDataArray.length; k++) {
        dataArray.push([xDataArray[k], yDataArray[k]]);
      }
      return dataArray;
    }

    function getRegressionOptionsObj(
      seriesDataArray,
      title,
      subtitle,
      xTitle,
      yTitle,
      regressionType = 'linear',
      legendCoordinates = [120, 100]
    ) {
      return {
        chart: {type: 'scatter', zoomType: 'xy'},
        title: {text: title},
        subtitle: {text: subtitle},
        xAxis: {title: {enabled: true, text: xTitle},
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {title: {text: yTitle}},
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
                        hover: {enabled: true, lineColor: 'rgb(100,100,100)'}
                    }
                },
                states: {hover: {marker: {enabled: false}}},
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}, {point.y}'
                }
            }
        },
        series: [{
            regression: true ,
            regressionSettings: {type: regressionType, color:  'rgba(223, 83, 83, .9)'},
            name: _TITLES.yearsTitle,
            color: 'rgba(223, 83, 83, .5)',
            data: seriesDataArray,
        }]
      };
    }
});
    
