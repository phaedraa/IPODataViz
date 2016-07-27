function getDualAxisOptionsObj(
  xAxisData,
  seriesData,
  title,
  subtitle,
  y1Title,
  y2Title,
  legendCoordinates = [15, 20],
  y1LabelSymbol = '',
  y2LabelSymbol = '',
  xLabelSymbol = ''
) {
  return {
    chart: { zoomType: 'xy', alignTicks: false },
    title: { text: title },
    subtitle: {text: subtitle },
    xAxis: [{ categories: xAxisData, crosshair: true }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}' + y1LabelSymbol,
        style: { color: Highcharts.getOptions().colors[1] }
      },
      title: {
        text: y1Title,
        style: { color: Highcharts.getOptions().colors[1] }
      },
    }, { // Secondary yAxis
      title: {
        text: y2Title, 
        style: { color: Highcharts.getOptions().colors[1] },
      },
      labels: {
        format: '{value}' + y2LabelSymbol,
        style: { color: Highcharts.getOptions().colors[0] }
      },
      opposite: true,
    }],
    tooltip: { shared: true },
    legend: {
      x: legendCoordinates[0],
      y: legendCoordinates[1],
      floating: true,
      backgroundColor: (
        Highcharts.theme && Highcharts.theme.legendBackgroundColor
      ) || '#FFFFFF'
    },
    series: seriesData,
  };
}