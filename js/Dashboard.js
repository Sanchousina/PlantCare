import { measures } from "./data.js";
import { Diagram } from "./Diagram.js";
import { Modal } from "./Modal.js";

export class Dashboard {
  constructor(moisturePanelRef, lightPanelRef, temperaturePanelRef, humidityPanelRef) {
    this.moisturePanel = document.querySelector(moisturePanelRef);
    this.lightPanel = document.querySelector(lightPanelRef);
    this.temperaturePane = document.querySelector(temperaturePanelRef);
    this.humidityPanel = document.querySelector(humidityPanelRef);

    this.moistureModal = new Modal("moistureStatsModal", "openMoistureStatsBtn", 
    "moistureStatsModalCloseBtn", "moisture");
    this.moistureDiagram = new Diagram(measures, "moisture", "moisture over time", 
    "#00ff00", "line", "moistureChart");

    this.lightModal = new Modal("lightStatsModal", "openLightStatsBtn", 
    "lightStatsModalCloseBtn", "light");
    this.lightDiagram = new Diagram(measures, "light", "light over time", 
    "#00ff00", "line", "lightChart");

    this.temperatureModal = new Modal("temperatureStatsModal", "openTemperatureStatsBtn", 
    "temperatureStatsModalCloseBtn", "temperature");
    this.temperatureDiagram = new Diagram(measures, "temperature", "temperature over time", 
    "#00ff00", "line", "temperatureChart");

    this.humidityModal = new Modal("humidityStatsModal", "openHumidityStatsBtn", 
    "humidityStatsModalCloseBtn", "humidity");
    this.humidityDiagram = new Diagram(measures, "humidity", "humidity over time", 
    "#00ff00", "line", "humidityChart");

    //TODO Register for the "newData" event
  }

  //TODO Implement a private method 'getNewestMeasure' which filters for the most recent measure and returns it
    //Use reduce to implement this.
    #getNewestMeasure() {
        
    }


    //TODO Implement a private function to calculate the percentage of measurements which were below acceptable thresholds
    //The method gets an upper and lower threshold and the measureType
    //Returns a percentage of how many measurements were inacceptable
    //Use filter to implement this
    #getInacceptableMeasurementQuota(upperThreshold, lowerThreshold, measureType){
        return -100;
    }

    //TODO Implement a private method 'getMinMeasure' which returns the minimum measure for a certain measureType
    //Use reduce to implement this.
    #getMinMeasure(measureType) {
       return {}
    }

    //TODO Implement a private method 'getMaxMeasure' which returns the max measure for a certain measureType
    //Use reduce to implement this.
    #getMaxMeasure() {
        return {};
    }
 
    //TODO Implement a method to update the UI (show most recent measure on the panels, min/max values, last update, percentage of how many measure were within acceptable thresholds etc)
    updateUI() {

    }
}