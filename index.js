var IPO_DATA_CSV = "/TheInformation_DataStoryteller_02222016-3.csv";

$(document).ready(function() { 
    var dataTitles = {'IPOTitle': '', 'percProfitTitle': ''};
        years = {'title': '', data: []};
        techData = {'title': '', numIPOs: [], 'percProfit': []};
        otherData = {'title': '', 'numIPOs': [], 'percProfit': []}

    Papa.parse(IPO_DATA_CSV, {
      download: true,
      complete: function(results) {
        parseData(results.data);
      }
    });

    function parseData(IPOData) {
      console.log(IPOData);
      dataTitles.IPOTitle = IPOData[1][1];
      dataTitles.percProfitTitle = IPOData[1][2];
      years.title = IPOData[1][0];
      techData.title = IPOData[0][1];
      otherData.title = IPOData[0][3];
      IPOData = IPOData.slice(2);
      
      for(var i=0; i<IPOData.length; i++) {
        years.data.push(IPOData[i][0]);
        techData.numIPOs.push(parseInt(IPOData[i][1]));
        techData.percProfit.push(parseInt(IPOData[i][2]));
        otherData.numIPOs.push(parseInt(IPOData[i][3]));
        otherData.percProfit.push(parseInt(IPOData[i][4]));
      }
    }

    $('#view_details_1').bind('click', handleSelectMovingAvgDualAxisTimeSeries);
    $('#view_details_2').bind('click', handleSelectDualAxisTimeSeries);
    $('#view_details_3').bind('click', handleSelectYoYSinglelAxisTimeSeries);

    function getNewDataObj() {
      return {
        techIPOs: [],
        techPercProfits: [],
        otherIPOs: [],
        otherPercProfits: [],
      };
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

        for (var j=0; j<years.data.length; j++) {
          MovingAvgDataObj.techIPOs.push(
            getMovingAvg(MovingAvgDataObj.techIPOs, techData.numIPOs[j])
          );
          MovingAvgDataObj.techPercProfits.push(
            getMovingAvg(MovingAvgDataObj.techPercProfits, techData.percProfit[j])
          );
          MovingAvgDataObj.otherIPOs.push(
            getMovingAvg(MovingAvgDataObj.otherIPOs, otherData.numIPOs[j])
          );
          MovingAvgDataObj.otherPercProfits.push(
            getMovingAvg(MovingAvgDataObj.otherPercProfits, otherData.percProfit[j])
          );
        }

        return MovingAvgDataObj;
      }

      var mvgAvgData = getMovingAvgData();
      var TSData = [];
      
      TSData.push(createSeriesObj(
        techData.title + ' - ' + dataTitles.IPOTitle,
        mvgAvgData.techIPOs
      ));
      TSData.push(createSeriesObj(
        otherData.title + ' - ' + dataTitles.IPOTitle,
        mvgAvgData.otherIPOs
      ));
      TSData.push(createSeriesObj(
        techData.title + ' - ' + dataTitles.percProfitTitle,
        mvgAvgData.techPercProfits,
        '%'
      ));
      TSData.push(createSeriesObj(
        otherData.title + ' - ' + dataTitles.percProfitTitle,
        mvgAvgData.otherPercProfits,
        '%'
      ));

      var options = getDualAxisOptionsObj(
        years.data,
        TSData,
        'Moving Averages of ' + dataTitles.IPOTitle + ' & ' + dataTitles.percProfitTitle,
        'Split by ' + techData.title + ' and ' + otherData.title,
        dataTitles.percProfitTitle + ' Moving Avg',
        dataTitles.IPOTitle + ' Moving Avg',
        [years.data.length * 25, 0],
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
        
        for(var j=0; j<years.data.length - 1; j++) {
          YoYChangesDataObj.techIPOs.push(
            getPercDiff(techData.numIPOs[j], techData.numIPOs[j+1])
          );
          YoYChangesDataObj.techPercProfits.push(
            getPercDiff(techData.percProfit[j], techData.percProfit[j+1])
          );
        }

        return YoYChangesDataObj;
      }

      var YoYData = getYoYPercChangesData();
      var TSData = [];

      TSData.push(createSeriesObj(
        dataTitles.percProfitTitle + ' - Delta',
        YoYData.techPercProfits,
        '%',
        true
      ));
      TSData.push(createSeriesObj(
        dataTitles.IPOTitle + ' - Delta',
        YoYData.techIPOs,
        '%',
        true
      ));
      console.log('data', TSData);
      var options = getSingleAxisOptionsObj(
        years.data.slice(1),
        TSData,
        'Year Over Year % Changes in IPOs & ' + dataTitles.percProfitTitle,
        '',
        'YoY Changes (%)',
        [years.data.length * 10, 10],
        '%'
      );
      console.log(options);
      return $('#chart').highcharts(options);
    }

    function handleSelectDualAxisTimeSeries(event) {
      var TSData = [];
      TSData.push(createSeriesObj(
        techData.title + '- ' + dataTitles.IPOTitle,
        techData.numIPOs,
        '',
        false,
        'column'
      ));
      TSData.push(createSeriesObj(
        otherData.title + '- ' + dataTitles.IPOTitle,
        otherData.numIPOs,
        '',
        false,
        'column'          
      ));
      TSData.push(createSeriesObj(
        techData.title + '- ' + dataTitles.percProfitTitle,
        techData.percProfit,
        '%'
      ));
      TSData.push(createSeriesObj(
        otherData.title + '- ' + dataTitles.percProfitTitle,
        otherData.percProfit,
        '%'
      ));

      var options = getDualAxisOptionsObj(
        years.data,
        TSData,
        dataTitles.IPOTitle + '& ' + dataTitles.percProfitTitle,
        'Split by ' + techData.title + ' and ' + otherData.title,
        dataTitles.percProfitTitle,
        dataTitles.IPOTitle,
        [years.data.length * 25, 0],
        '%',
        ''
      );
      return $('#chart').highcharts(options);
    }

    function createSeriesObj(
      name,
      dataArray,
      valueSuffix = '',
      isSingleAxis = false,
      chartType = 'spline'
    ) {
      var seriesObj = {
        name: name,
        data: dataArray,
        tooltip: {valueSuffix: valueSuffix}
      };

      if (!isSingleAxis) {
        seriesObj.type = chartType;
        seriesObj.yAxis = 1;
      }

      return seriesObj;
    }

    // function handleSelectTimeSeries(event) {
    //   var TSData = [];
    //   TSData.push(createSeriesObj(techData.title,techData.numIPOs, '', false));
    //   TSData.push(createSeriesObj(otherData.title, otherData.numIPOs, '', false));
    //   var optionsTS = getSingleAxisOptionsObj(
    //     years.data,
    //     TSData,
    //     dataTitles.IPOTitle,
    //     '',
    //     dataTitles.IPOTitle
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
      return 'Split by ' + techData.title + ' and ' + otherData.title;
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
      xLabelSymbol = ''
    ) {
      return {
        chart: {zoomType: 'xy'},
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
            }
        }, { // Secondary yAxis
            title: {
                text: y2Title,
                style: {color: Highcharts.getOptions().colors[0]},
            },
            labels: {
                format: '{value}'+y2LabelSymbol,
                style: {color: Highcharts.getOptions().colors[0]}
            },
            opposite: true
        }],
        tooltip: {shared: true},
        legend: {
            layout: 'vertical',
            align: 'left',
            x: legendCoordinates[0],
            verticalAlign: 'top',
            y: legendCoordinates[1],
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: seriesDataArray,
      };
    }
});
    
