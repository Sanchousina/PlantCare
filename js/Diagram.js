import { calcAverage } from "./utility.js";

export class Diagram {
  constructor(rawMeasures, measureType, chartLabel, chartColor, chartType, chartRef) {
    this.measuresType = measureType;
    this.hourMap = this.#createHourMap(rawMeasures, this.measuresType);
    this.chartWrapper = document.getElementById(chartRef);
    this.chartLabel = chartLabel;
    this.chartColor = chartColor;
    this.chartType = chartType;
    this.#setLabelsAndData(this.hourMap);
    this.chart = this.#createChart(this.chartLabels, this.chartData, this.chartType, this.chartLabel, this.chartWrapper, this.chartColor);

    document.addEventListener('newData', (e) => {
      console.log('Listening to newData event in Diagram')
      this.hourMap = this.#createHourMap(e.detail, this.measuresType);
      this.#setLabelsAndData(this.hourMap);
      this.#updateChart(this.chartLabels, this.chartData);
    });
  }

  #createChart(chartLabels, chartData, type, label, chartWrapper, color) {
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

  #createHourMap(data, type) {
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

  #updateChart(newLabels, newData) {
    this.chart.data.datasets[0].data = newData;
    this.chart.data.labels = newLabels;
    this.chart.update();
  }

  #setLabelsAndData(hourMap) {
    this.chartLabels = [];
    this.chartData=[];
  
    for (let [key, value] of Object.entries(hourMap)) {
      this.chartLabels.push(key);
      this.chartData.push(calcAverage(value));
    }
  }
}