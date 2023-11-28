import { calcAverage } from "./utility.js";

export class Diagram {
  constructor(rawMeasures, measureType, chartLabel, chartColor, chartType, chartRef) {
    this.measuresType = measureType;
    this.measures = this.transformMeasures(rawMeasures, this.measuresType);
    this.chartWrapper = document.getElementById(chartRef);
    this.chartLabel = chartLabel;
    this.chartColor = chartColor;
    this.chartType = chartType;
    this.setLabelsAndData(this.measures);
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

  transformMeasures(data, type) {
    let res = {};
  
    data.forEach(el => {
      const date = new Date(el.timeISO);
      const hour = date.getHours();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
    
      const key = `${day}-${month}-${year}-${hour}`;
    
      if (res[key] === undefined) {
        res[key] = [el[type]];
      } else {
        res[key].push(el[type]);
      }
    })
  
    return res;
  }

  setLabelsAndData(hourMap) {
    this.chartLabels = [];
    this.chartData=[];
  
    for (let [key, value] of Object.entries(hourMap)) {
      this.chartLabels.push(key);
      this.chartData.push(calcAverage(value));
    }
  }
}