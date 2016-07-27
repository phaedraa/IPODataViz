$(document).ready(function() {
  var handleSelectMovingAvgTimeSeries = require('./movingAverageHelper.js');
  var handleSelectDualAxisTimeSeries = require('./dualAxisTimeSeriesHelper.js');
  var handleSelectYoYGrowthTimeSeries = require('./yoyHelper.js');
  var handleSelectRegressionWithScatterPlot = require('./regressionHelper.js');
  var handleSelectDecadeBarGraph = require('./decadeHelper.js');
  var handleSelectHistoricalSummaries = require('./historicalHelper.js');

  assignListeners();

  function assignListeners() {
    $('#view_details_1').bind('click', handleSelectMovingAvgTimeSeries);
    $('#view_details_2').bind('click', handleSelectDualAxisTimeSeries);
    $('#view_details_3').bind('click', handleSelectYoYGrowthTimeSeries);
    $('#view_details_4').bind('click', handleSelectRegressionWithScatterPlot);
    $('#view_details_5').bind('click', handleSelectDecadeBarGraph);
    $('#view_details_6').bind('click', handleSelectHistoricalSummaries);
  }
});
