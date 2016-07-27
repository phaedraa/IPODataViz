function getTimeRangeStr() {
  var parsedData = require('./dataHelper.js');
  var IPODATA = parsedData.IPODATA;
  return IPODATA.years[0] + ' - ' + IPODATA.years[IPODATA.years.length - 1];
}

module.exports = getTimeRangeStr;
