function getSingleAxisOptionsObj(
  xAxisDataArray,
  seriesDataArray,
  title,
  subtitle,
  y1Title,
  legendCoordinates = [15, 20],
  y1LabelSymbol = '',
  xLabelSymbol = ''
) {
  return {
    title: { text: title, x: -20 /*center*/ },
    subtitle: { text: subtitle, x: -20 },
    xAxis: { categories: xAxisDataArray },
    yAxis: {
      labels: { format: '{value}' + y1LabelSymbol },
      title: { text: y1Title },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: { valueSuffix: y1LabelSymbol },
    legend: {
      x: legendCoordinates[0],
      y: legendCoordinates[1],
      borderWidth: 0
    },
    series: seriesDataArray,
  };
}