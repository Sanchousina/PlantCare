import { measures } from "./data.js";
import { StatsModalBtn } from "./statsModuleBtn.js";
import { Diagram } from "./Diagram.js";
import { Modal } from "./Modal.js";

let moistureStatsModalBtn = document.getElementById("openMoistureStatsBtn");
let lightStatsModalBtn = document.getElementById("openLightStatsBtn");
let humidityStatsModalBtn = document.getElementById("openHumidityStatsBtn");
let temperStatsModalBtn = document.getElementById("openTemperStatsBtn");

const statsModalBtns = [
  new StatsModalBtn(moistureStatsModalBtn, "moisture"),
  new StatsModalBtn(lightStatsModalBtn, "light"),
  new StatsModalBtn(humidityStatsModalBtn, "humidity"),
  new StatsModalBtn(temperStatsModalBtn, "temperature")
];

const modals = statsModalBtns.map(
  el => new Modal(`${el.type}StatsModal`, el.node, `${el.type}StatsModalCloseBtn`, el.type)
);

const diagrams = statsModalBtns.map((el, i) => {
  return new Diagram(measures, el.type, `${el.type} over time`, "#00ff00", "line", `${el.type}Chart`);
});

//TODO: Create "newData" event when new data is available. Send the "measures" array with the event
const newDataEvent = new CustomEvent('newData', {
  detail: measures, 
  bubbles: true
});

//TODO: Disptach the event
document.dispatchEvent(newDataEvent);

//TODO: Wait 10secs, then create another "newData" event, containing the measures array cut in half. Dispatch the event
setTimeout(() => {
  const newDataEvent = new CustomEvent('newData', {
    detail: measures.slice(0, measures.length/2), 
    bubbles: true
  });
  console.log('Another newData event with mesaures cut in half');
  document.dispatchEvent(newDataEvent);
}, 10000)
