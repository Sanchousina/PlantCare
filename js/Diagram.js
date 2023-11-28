export class Diagram {
  constructor(rawMeasures, chartLabels, chartData, measureType, chartLabel, chartColor, chartType, chartRef) {
    this.measures = rawMeasures; // transformMeasures(rawMeasures)
    this.measuresType = measureType;
    this.chartWrapper = document.getElementById(chartRef);
    this.chartLabel = chartLabel;
    this.chartColor = chartColor;
    this.chartType = chartType;
    // this.chartLabels = []; 
    // this.chartData = [];
    this.chartLabels = chartLabels; 
    this.chartData = chartData;
    this.diagram = this.createChart(this.chartLabels, this.chartData, this.chartType, this.chartLabel, this.chartWrapper, this.chartColor);
  }

  createChart(chartLabels, chartData, type, label, chartWrapper, color) {
    return new Chart(chartWrapper, {
        type: type,
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                label: label,
                borderColor: color,
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: label
            },
    
            responsive: true,
            maintainAspectRatio: false
        }
    });
  }
}