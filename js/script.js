import { measures } from "./data.js";
import { StatsModalBtn } from "./statsModuleBtn.js";
import { Diagram } from "./Diagram.js";
import { Modal } from "./Modal.js";

/*===Modal Implementation===*/
// Get the #statsModal modal

//let statsModal = document.getElementById("statsModal"); 

let statsHeader = document.querySelector(".modal-header>h2");

// Get the button that opens the modal
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

const modals = statsModalBtns.map(el => new Modal(`${el.type}StatsModal`, el.node, `${el.type}StatsModalCloseBtn`));
const diagrams = statsModalBtns.map((el, i) => {
  return new Diagram(measures, el.type, `${el.type} over time`, "#00ff00", "line", `${el.type}Chart`);
})

statsModalBtns.forEach((el, i) => {
  el.node.addEventListener('click', () => {
    statsHeader.innerText = `${el.type} stats` // FIX
  })
})
