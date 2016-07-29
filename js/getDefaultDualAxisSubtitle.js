function getDefaultDualAxisSubtitle() {
  var parsedData = require('./dataHelper.js');
  var TITLES = parsedData.TITLES;
  return 'Split by ' + TITLES.tech + ' and ' + TITLES.other;
}

module.exports = getDefaultDualAxisSubtitle;
