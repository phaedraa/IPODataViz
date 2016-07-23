var IPO_DATA_CSV = "/TheInformation_DataStoryteller_02222016-3.csv";

$(document).ready(function() { 
    var dataTitles = {'IPOTitle': '', 'percProfitTitle': ''};
        years = {'title': '', data: []};
        techData = {'title': '', numIPOs: [], 'percProfit': []};
        otherData = {'title': '', 'numIPOs': [], 'percProfit': []}
        options = {
          title: {text: '',x: -20 /*center*/},
          subtitle: {text: '',x: -20},
          xAxis: {categories: '',},
          yAxis: {title: {text:''}, plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]},
          tooltip: {valueSuffix: ''},
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series:[],
        };

    Papa.parse(IPO_DATA_CSV, {
      download: true,
      complete: function(results) {
        parseData(results.data);
      }
    });

    function parseData(Array: IPOData): void {
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

    $('#view_details_1').bind('click', handleSelectTimeSeries);
    $('#view_details_2').bind('click', handleSelectDualAxisTimeSeries);
    $('#view_details_3').bind('click', handleSelectYoYDualAxisTimeSeries);

    function handleSelectYoYDualAxisTimeSeries(event): void {
      
      function getPercDiff(Number: val1, Number: val2): Number {

      }

      function getYoYPercChangesData(): Object {
        var YoYChangesDataObj = {techIPOs: [], techPercProfits: [], otherIPOs: [], otherPercProfits: []};
        for(var j=0; j<years.data.length - 1; j++) {
          var YoY = 100 * (dataArray[j+1] - dataArray[j]) / dataArray[j];

          YoYChangesDataObj.techIPOs.push(getPercDiff(techData.numIPOs[j], techData.numIPOs[j+1]);
          techData.percProfit.push(parseInt(IPOData[i][2]));
          otherData.numIPOs.push(parseInt(IPOData[i][3]));
          otherData.percProfit.push(parseInt(IPOData[i][4]));
        }

      }

      var optionsTS = Object.assign({}, options);
          optionsTS.chart = {zoomType: 'xy'};
          optionsTS.title.text = 
            dataTitles.IPOTitle + '& ' + dataTitles.percProfitTitle;
          optionsTS.subtitle.text =
            'Split by ' + techData.title + ' and ' + otherData.title;
          optionsTS.xAxis = [{categories: years.data.slice(1), crosshair: true}];
          optionsTS.yAxis = [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {color: Highcharts.getOptions().colors[0]}
            },
            title: {
                text: dataTitles.percProfitTitle,
                style: {color: Highcharts.getOptions().colors[0]}
            }
        }, { // Secondary yAxis
            title: {
                text: dataTitles.IPOTitle,
                style: {color: Highcharts.getOptions().colors[1]}
            },
            labels: {
                style: {color: Highcharts.getOptions().colors[1]}
            },
            opposite: true
        }];
        optionsTS.tooltip = {shared: true},
        optionsTS.legend = {
            layout: 'vertical',
            align: 'left',
            x: years.data.length * 25,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        };
        optionsTS.series = [{
            name: techData.title + '- ' + dataTitles.percProfitTitle,
            type: 'column',
            data: techData.percProfit,
            tooltip: {valueSuffix: '%'}
        }, {
            name: otherData.title + '- ' + dataTitles.percProfitTitle,
            type: 'column',
            data: otherData.percProfit,
            tooltip: {valueSuffix: '%'}
        },
        {
            name: otherData.title + '- ' + dataTitles.IPOTitle,
            type: 'spline',
            yAxis: 1,
            data: otherData.numIPOs,
        }, 
        {
            name: techData.title + '- ' + dataTitles.IPOTitle,
            type: 'spline',
            yAxis: 1,
            data: techData.numIPOs,
        }];
      var chart = $('#chart').highcharts(optionsTS);

    }


    function handleSelectDualAxisTimeSeries(event) {
      var optionsTS = Object.assign({}, options);
          optionsTS.chart = {zoomType: 'xy'};
          optionsTS.title.text = 
            dataTitles.IPOTitle + '& ' + dataTitles.percProfitTitle;
          optionsTS.subtitle.text =
            'Split by ' + techData.title + ' and ' + otherData.title;
          optionsTS.xAxis = [{categories: years.data, crosshair: true}];
          optionsTS.yAxis = [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {color: Highcharts.getOptions().colors[0]}
            },
            title: {
                text: dataTitles.percProfitTitle,
                style: {color: Highcharts.getOptions().colors[0]}
            }
        }, { // Secondary yAxis
            title: {
                text: dataTitles.IPOTitle,
                style: {color: Highcharts.getOptions().colors[1]}
            },
            labels: {
                style: {color: Highcharts.getOptions().colors[1]}
            },
            opposite: true
        }];
        optionsTS.tooltip = {shared: true},
        optionsTS.legend = {
            layout: 'vertical',
            align: 'left',
            x: years.data.length * 25,
            verticalAlign: 'top',
            y: 0,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        };
        optionsTS.series = [{
            name: techData.title + '- ' + dataTitles.percProfitTitle,
            type: 'column',
            data: techData.percProfit,
            tooltip: {valueSuffix: '%'}
        }, {
            name: otherData.title + '- ' + dataTitles.percProfitTitle,
            type: 'column',
            data: otherData.percProfit,
            tooltip: {valueSuffix: '%'}
        },
        {
            name: otherData.title + '- ' + dataTitles.IPOTitle,
            type: 'spline',
            yAxis: 1,
            data: otherData.numIPOs,
        }, 
        {
            name: techData.title + '- ' + dataTitles.IPOTitle,
            type: 'spline',
            yAxis: 1,
            data: techData.numIPOs,
        }];
      var chart = $('#chart').highcharts(optionsTS);

    }

    function handleSelectTimeSeries(event) {
      var optionsTS = Object.assign({}, options);
      optionsTS.title.text = dataTitles.IPOTitle;
      optionsTS.xAxis.categories = years.data;
      optionsTS.yAxis.title.text = dataTitles.IPOTitle;
      optionsTS.series = [{
        name: techData.title,
        data: techData.numIPOs,
      },
      {
        name: otherData.title,
        data: otherData.numIPOs,
      }];
      var chart = $('#chart').highcharts(optionsTS);
      console.log(chart);
    };

    if(isAPIAvailable()) {
        console.log('here');
        // $('#my-file-selector').bind('change', handleFileSelect);
      }
    });

    function isAPIAvailable() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
      } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
      }
    }

    function handleFileSelect(evt) {
      // console.log('handleFileSelect');
      // var csv = "file:///C:/Users/phaedrarandolph/IPODataViz/TheInformation_DataStoryteller_02222016-3.csv";
      // var read = readTextFile(csv);
      // console.log('read', read);
 
      var files = evt.target.files; // FileList object
      var file = files[0];
      // console.log('file', file);
      console.log(evt);
      console.log('f', evt.target.files);
      console.log('file', file);
      
      var data = null;
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csvData = event.target.result;
        data = $.csv.toArrays(csvData);
        console.log('data', data);
        if (data && data.length > 0) {
          alert('Imported -' + data.length + '- rows successfully!');
        } else {
          alert('No data to import!');
        }
      };
      reader.onerror = function() {
        alert('Unable to read ' + file.fileName);
      };
       

      // var data = $.csv.toObjects(files);
      // console.log('data', data);

      // read the file metadata
      var output = ''
          output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
          output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
          output += ' - FileSize: ' + file.size + ' bytes<br />\n';
          output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

      // read the file contents
      // printTable(file);

      // post the results
      console.log('output', output);
      return;
    }

    function readTextFile(file) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  var allText = rawFile.responseText;
                  alert(allText);
              }
          }
      }
      rawFile.send(null);
    }

    function printTable(file) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);
        var html = '';
        for(var row in data) {
          html += '<tr>\r\n';
          for(var item in data[row]) {
            html += '<td>' + data[row][item] + '</td>\r\n';
          }
          html += '</tr>\r\n';
        }
        $('#contents').html(html);
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    }
