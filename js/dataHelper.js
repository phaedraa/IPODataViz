var TITLES = {
  IPO: '',
  percProfit: '',
  tech: '',
  other: '',
  years: '',
  numProfit: '',
  legend: new Object()
};

var getNewDataObj = requre('./getNewDataObj.js');
var IPODATA = getNewDataObj();

parseData();
module.exports = { IPODATA: IPODATA, TITLES: TITLES };

function parseData() {
  Papa.parse('/TheInformation_DataStoryteller_02222016-3.csv', {
    download: true,
    complete: function(results) {
      populateDataArrays(results.data);
    }
  });

  function populateDataArrays(rawData) {
    populateTitles();
    isolateData();
    reformatData();

    function populateTitles() {
      TITLES.IPO = rawData[1][1];
      TITLES.percProfit = rawData[1][2];
      TITLES.tech = rawData[0][1];
      TITLES.other = rawData[0][3];
      TITLES.years = rawData[1][0];
      TITLES.numProfit = 'Number Profitable';
      createLegendTitles();

      function createLegendTitles() {
        TITLES.legend.techIPOs = TITLES.tech + ' - ' + TITLES.IPO;
        TITLES.legend.techPercProfits = TITLES.tech + ' - ' + TITLES.percProfit;
        TITLES.legend.techNumProfit = TITLES.tech + ' - ' + TITLES.numProfit;
        TITLES.legend.otherIPOs = TITLES.other + ' - ' + TITLES.IPO;
        TITLES.legend.otherPercProfits = TITLES.other + ' - ' + TITLES.percProfit;
        TITLES.legend.otherNumProfit = TITLES.other + ' - ' + TITLES.numProfit;
      }
    }

    function isolateData() {
      rawData = rawData.slice(2);
    }

    function reformatData() {
      IPODATA.years = [];
      IPODATA.techNumProfit = [];
      IPODATA.otherNumProfit = [];
      rawData.forEach(function(datum) {
        IPODATA.years.push(datum[0]);
        IPODATA.techIPOs.push(parseInt(datum[1]));
        IPODATA.techPercProfits.push(parseInt(datum[2]));
        IPODATA.otherIPOs.push(parseInt(datum[3]));
        IPODATA.otherPercProfits.push(parseInt(datum[4]));
        IPODATA.techNumProfit.push(getTotalFromPerc(datum[1], datum[2]))
        IPODATA.otherNumProfit.push(getTotalFromPerc(datum[3], datum[4]));
      });

      function getTotalFromPerc(totalStr, percentStr) {
        return Math.floor(parseInt(totalStr) * (parseInt(percentStr) / 100.0));
      }
    }
  }
}
