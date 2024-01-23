import { Diagram } from "./Diagram.js";
import { Modal } from "./Modal.js";

export class Dashboard {
  constructor(moisturePanelRef, lightPanelRef, temperaturePanelRef, fertilityPanelRef) {
    this.moisturePanel = document.getElementById(moisturePanelRef);
    this.lightPanel = document.getElementById(lightPanelRef);
    this.temperaturePanel = document.getElementById(temperaturePanelRef);
    this.fertilityPanel = document.getElementById(fertilityPanelRef);
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

    this.fertilityModal = new Modal("fertilityStatsModal", "openFertilityStatsBtn", 
    "fertilityStatsModalCloseBtn", "fertility");
    this.fertilityDiagram = new Diagram(this.measures, "conductivity", "fertility over time", 
    "#00ff00", "line", "fertilityChart");

    document.addEventListener('newData', (e) => {
      this.measures = e.detail;
      this.updateUI()
    });

    document.addEventListener('plantInfo', (e) => {
      this.plantInfo = e.detail;
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
      //TODO: Interpet the values
      const currentMeasure = this.#getNewestMeasure();

      this.moisturePanel.querySelector("#currMoistureValue").innerHTML = currentMeasure.moisture + " %<br><small>measured on " + new Date(currentMeasure.timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.moisturePanel.querySelector("#minAndMaxMoistureValue").innerHTML = "Min: " + this.#getMinMeasure('moisture') + "%, Max: " + this.#getMaxMeasure('moisture') + "%";
      this.moisturePanel.querySelector("#currSoilInterpret").innerHTML = currentMeasure.moisture > this.plantInfo.moisture_max ? "too wet!" : currentMeasure.moisture < this.plantInfo.moisture_min ? "too dry :(" : "perfect!";
      
      this.lightPanel.querySelector("#currLightValue").innerHTML = this.#getNewestMeasure().light + " Lux<br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.lightPanel.querySelector("#minAndMaxLightValue").innerHTML = "Min: " + this.#getMinMeasure('light') + " Lux, Max: " + this.#getMaxMeasure('light') + " Lux";
      this.lightPanel.querySelector("#currLightInterpret").innerHTML = currentMeasure.light > this.plantInfo.light_max ? "too bright!" : currentMeasure.light < this.plantInfo.light_min ? "too dark :(" : "perfect!";

      this.fertilityPanel.querySelector("#currFertilityValue").innerHTML = this.#getNewestMeasure().fertility + " <br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.fertilityPanel.querySelector("#minAndMaxFertilityValue").innerHTML = "Min: " + this.#getMinMeasure('fertility') + ", Max: " + this.#getMaxMeasure('fertility') + "";
      this.fertilityPanel.querySelector("#currFertilityInterpret").innerHTML = currentMeasure.fertility > this.plantInfo.fertility_max ? "too much!" : currentMeasure.fertility < this.plantInfo.fertility_min ? "too low :(" : "perfect!";

      this.temperaturePanel.querySelector("#currTempValue").innerHTML = this.#getNewestMeasure().temperature + " °C<br><small>measured on " + new Date(this.#getNewestMeasure().timeISO).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: 'numeric', minute: 'numeric' }) + "</small>";
      this.temperaturePanel.querySelector("#minAndMaxTempValue").innerHTML = "Min: " + this.#getMinMeasure('temperature') + "°C, Max: " + this.#getMaxMeasure('temperature') + "°C";
      this.temperaturePanel.querySelector("#currTempInterpret").innerHTML = currentMeasure.temperature > this.plantInfo.temperature_max ? "too hot!" : currentMeasure.temperature < this.plantInfo.temperature_min ? "too cold :(" : "perfect!";
    }
}