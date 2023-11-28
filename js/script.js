import { measures } from "./data.js";
import { StatsModalBtn } from "./statsModuleBtn.js";
import { Diagram } from "./Diagram.js";
import { calcAverage } from "./utility.js";

/*===Modal Implementation===*/
// Get the #statsModal modal

let statsModal = document.getElementById("statsModal"); 

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

// Get the <span> element that closes the statsModal
let statsModalCloseBtn = document.getElementById("statsModalCloseBtn");

// When the user clicks the statsModalBtn button, open the modal
statsModalBtns.forEach(el => el.node.addEventListener('click', () => statsModal.style.display = 'block'));

// When the user clicks on <span> (x), close the modal
statsModalCloseBtn.addEventListener('click', () => statsModal.style.display = 'none'); // FIX: doesn't clear chart

// When the user clicks anywhere outside of the modal, close it
function clearChart(chart) {
  window.onclick = function (event) {
    if (event.target == statsModal) {
        statsModal.style.display = "none";
        chart.destroy();
    }
  }
}

statsModalBtns.forEach((el, i) => {

  el.node.addEventListener('click', () => {
    statsHeader.innerText = `${el.type} stats`

    const diagram = new Diagram(measures, el.type, `${el.type} over time`, "#00ff00", "line", "chart");
    clearChart(diagram.diagram);
  })
})

/*===Charts Implementation===*/
//We use Chart.js to generate a line chart of the past hours: https://www.chartjs.org/docs/latest/charts/line.html

/*
We want to show the measures of each hour of the day. Thus, the first step is to sum up data belonging to the same hour.
There might be 0,1,2,3,...n measures for each hour of the day. Idea: Group them first. In the end, visualize the average.
*/

//We can use a hashmap to do this:
//Idea: {"16-11-23-1": [50,44]} for 16.11.2023, at 1am
//Extract an array for the data points and an array for labels from the raw data
