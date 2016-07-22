//var $ = jQuery = require('jquery');
//require('.jquery-csv/src/jquery.csv.js');

$(document).ready(function() { 
    var IPOData;
    Papa.parse("/TheInformation_DataStoryteller_02222016-3.csv", {
      download: true,
      complete: function(results) {
        IPOData = results;
        console.log(results);
      }
    });

      if(isAPIAvailable()) {
        console.log('here');
        $('#my-file-selector').bind('change', handleFileSelect);
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
