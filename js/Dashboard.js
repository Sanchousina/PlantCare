import { Diagram } from "./Diagram.js";
import { Modal } from "./Modal.js";

export class Dashboard {
  constructor(moisturePanelRef, lightPanelRef, temperaturePanelRef, humidityPanelRef) {
    this.moisturePanel = document.getElementById(moisturePanelRef);
    this.lightPanel = document.getElementById(lightPanelRef);
    this.temperaturePanel = document.getElementById(temperaturePanelRef);
    this.humidityPanel = document.getElementById(humidityPanelRef);
    this.measures = [];

    this.moistureModal = new Modal("moistureStatsModal", "openMoistureStatsBtn", 
    "moistureStatsModalCloseBtn", "moisture");
    this.moistureDiagram = new Diagram(this.measures, "moisture", "moisture over time", 
    "#00ff00", "line", "moistureChart");

    this.lightModal = new Modal("lightStatsModal", "openLightStatsBtn", 
    "lightStatsModalCloseBtn", "light");
    this.lightDiagram = new Diagram(this.measures, "light", "light over time", 
    "#00ff00", "line", "lightChart");

    this.temperatureModal = new Modal("temperatureStatsModal", "openTemperatureStatsBtn", 
    "temperatureStatsModalCloseBtn", "temperature");
    this.temperatureDiagram = new Diagram(this.measures, "temperature", "temperature over time", 
    "#00ff00", "line", "temperatureChart");

    this.humidityModal = new Modal("humidityStatsModal", "openHumidityStatsBtn", 
    "humidityStatsModalCloseBtn", "humidity");
    this.humidityDiagram = new Diagram(this.measures, "conductivity", "humidity over time", 
    "#00ff00", "line", "humidityChart");

    document.addEventListener('newData', (e) => {
      this.measures = e.detail;
      this.updateUI()
    });
  }

    #getNewestMeasure() {
      const newestMeasure = this.measures.reduce((acc, el) => {
        return new Date(acc.timeISO) > new Date(el.timeISO) ? acc : el;
      })
      return newestMeasure;
    }

    #getInacceptableMeasurementQuota(upperThreshold, lowerThreshold, measureType){
        let filteredData = this.measures.filter(el => {
          return el[measureType] < lowerThreshold || el[measureType] > upperThreshold;
        });
        return (filteredData.length/this.measures.length )* 100;
    }

    #getMinMeasure(measureType) {
      const minMeasure = this.measures.reduce((acc, el) => {
        return acc[measureType] < el[measureType] ? acc : el;
      })
      return minMeasure[measureType];
    }

    #getMaxMeasure(measureType) {
      const maxMeasure = this.measures.reduce((acc, el) => {
        return acc[measureType] > el[measureType] ? acc : el;
      })
      return maxMeasure[measureType];
    }
 
    updateUI() {
      this.moisturePanel.querySelector("#currMoistureValue").innerHTML = this.#getNewestMeasure().moisture + " %<br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.moisturePanel.querySelector("#minAndMaxMoistureValue").innerHTML = "Min: " + this.#getMinMeasure('moisture') + "%, Max: " + this.#getMaxMeasure('moisture') + "%";
      
      this.lightPanel.querySelector("#currLightValue").innerHTML = this.#getNewestMeasure().light + " Lux<br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.lightPanel.querySelector("#minAndMaxLightValue").innerHTML = "Min: " + this.#getMinMeasure('light') + " Lux, Max: " + this.#getMaxMeasure('light') + " Lux";

      this.humidityPanel.querySelector("#currHumidValue").innerHTML = this.#getNewestMeasure().conductivity + " <br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.humidityPanel.querySelector("#minAndMaxHumidValue").innerHTML = "Min: " + this.#getMinMeasure('conductivity') + ", Max: " + this.#getMaxMeasure('conductivity') + "";

      this.temperaturePanel.querySelector("#currTempValue").innerHTML = this.#getNewestMeasure().temperature + " °C<br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.temperaturePanel.querySelector("#minAndMaxTempValue").innerHTML = "Min: " + this.#getMinMeasure('temperature') + "°C, Max: " + this.#getMaxMeasure('temperature') + "°C";
    }
}