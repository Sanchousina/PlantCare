import { measures } from "./data.js";
import { StatsModalBtn } from "./statsModuleBtn.js";
import { Diagram } from "./Diagram.js";
import { Modal } from "./Modal.js";
import { Dashboard } from "./Dashboard.js";

let moistureStatsModalBtn = document.getElementById("openMoistureStatsBtn");
let lightStatsModalBtn = document.getElementById("openLightStatsBtn");
let humidityStatsModalBtn = document.getElementById("openHumidityStatsBtn");
let temperStatsModalBtn = document.getElementById("openTemperatureStatsBtn");

const statsModalBtns = [
  new StatsModalBtn(moistureStatsModalBtn, "moisture"),
  new StatsModalBtn(lightStatsModalBtn, "light"),
  new StatsModalBtn(humidityStatsModalBtn, "humidity"),
  new StatsModalBtn(temperStatsModalBtn, "temperature")
];

// const modals = statsModalBtns.map(
//   el => new Modal(`${el.type}StatsModal`, el.node, `${el.type}StatsModalCloseBtn`, el.type)
// );

// const diagrams = statsModalBtns.map((el, i) => {
//   return new Diagram(measures, el.type, `${el.type} over time`, "#00ff00", "line", `${el.type}Chart`);
// });

//Create "newData" event when new data is available. Send the "measures" array with the event
const newDataEvent = new CustomEvent('newData', {
  detail: measures, 
  bubbles: true
});

//Disptach the event
document.dispatchEvent(newDataEvent);

//Wait 10secs, then create another "newData" event, containing the measures array cut in half. Dispatch the event
setTimeout(() => {
  const newDataEvent = new CustomEvent('newData', {
    detail: measures.slice(0, measures.length/2), 
    bubbles: true
  });
  console.log('Another newData event with mesaures cut in half');
  document.dispatchEvent(newDataEvent);
}, 10000)

let dashboard= new Dashboard("moisturePanel", "lightPanel", "temperaturePanel", "humidityPanel");

