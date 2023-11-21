/*===Modal Implementation===*/
// Get the #moistureStatsModal modal

let statsModal = document.getElementById("statsModal"); //TODO: Implement this

// Get the button that opens the modal
let moistureStatsModalBtn = document.getElementById("openMoistureStatsBtn"); //TODO: Implement this
let lightStatsModalBtn = document.getElementById("openLightStatsBtn");
let humidityStatsModalBtn = document.getElementById("openHumidityStatsBtn");
let temperStatsModalBtn = document.getElementById("openTemperStatsBtn");

// Get the <span> element that closes the moistureStatsModal
let statsModalCloseBtn = document.getElementById("statsModalCloseBtn"); //TODO: Implement this

// When the user clicks the moistureStatsModalBtn button, open the modal (use css property display:none / display:block)
//TODO: Implement this
moistureStatsModalBtn.addEventListener('click', () => statsModal.style.display = 'block');
lightStatsModalBtn.addEventListener('click', () => statsModal.style.display = 'block');
humidityStatsModalBtn.addEventListener('click', () => statsModal.style.display = 'block');
temperStatsModalBtn.addEventListener('click', () => statsModal.style.display = 'block');


// When the user clicks on <span> (x) ("moistureStatsModalCloseBtn"), close the modal
//TODO: Implement this
statsModalCloseBtn.addEventListener('click', () => statsModal.style.display = 'none');

// When the user clicks anywhere outside of the modal, close it

function clearChart(chart) {
  window.onclick = function (event) {
    if (event.target == statsModal) {
        statsModal.style.display = "none";
        chart.destroy();
    }
  }
}

moistureStatsModalBtn.addEventListener('click', () => {
  const hourMap = transformMeasures(measures, 'moisture');

  let chartLabels=[];
  let chartData=[];

  for (let [key, value] of Object.entries(hourMap)) {
    chartLabels.push(key);
    chartData.push(calcAverage(value));
  }

  const chart = createChart(chartLabels, chartData, 'moisture');

  clearChart(chart);
})

lightStatsModalBtn.addEventListener('click', () => {
  const hourMap = transformMeasures(measures, 'light');

  let chartLabels=[];
  let chartData=[];

  for (let [key, value] of Object.entries(hourMap)) {
    chartLabels.push(key);
    chartData.push(calcAverage(value));
  }

  const chart = createChart(chartLabels, chartData, 'light');

  clearChart(chart);
})

humidityStatsModalBtn.addEventListener('click', () => {
  // No Humidity Data => NaN
  const hourMap = transformMeasures(measures, 'humidity');

  let chartLabels=[];
  let chartData=[];

  for (let [key, value] of Object.entries(hourMap)) {
    chartLabels.push(key);
    chartData.push(calcAverage(value));
  }

  const chart = createChart(chartLabels, chartData, 'humidity');

  clearChart(chart);
})

temperStatsModalBtn.addEventListener('click', () => {
  const hourMap = transformMeasures(measures, 'temperature');

  let chartLabels=[];
  let chartData=[];

  for (let [key, value] of Object.entries(hourMap)) {
    chartLabels.push(key);
    chartData.push(calcAverage(value));
  }

  const chart = createChart(chartLabels, chartData, 'temperature');

  clearChart(chart);
})


/*===Charts Implementation===*/
//We use Chart.js to generate a line chart of the past hours: https://www.chartjs.org/docs/latest/charts/line.html

//This is an array of raw measures from the sensor. We are now interested in the moisture measures only
let measures = [
    {
        timeISO: "2023-11-17T00:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 49,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T00:38:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 42,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T02:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 38,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T02:58:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 36,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T04:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 34,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T05:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 31,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T05:34:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 28,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T07:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 25,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T08:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 23,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T09:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 22,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T10:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 21,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T11:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 77,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T12:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 75,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T13:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 72,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T14:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 68,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T15:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 66,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T16:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 64,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T17:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 63,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T17:28:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 62,
        temperature: 21.9,
        battery: 97
    },
    {
        timeISO: "2023-11-17T19:08:16.892Z",
        conductivity: 392,
        light: 0,
        moisture: 61,
        temperature: 21.9,
        battery: 97
    }
]


/*
We now want to visualize the moisture readings on a line graph. Please carefuly read the docs: https://www.chartjs.org/docs/latest/charts/line.html
As you might have seen, we need an array for the data points and an array for labels. We need to extract both from the raw data
*/

/*
We want to show the moisture of each hour of the day. Thus, the first step is to sum up data belonging to the same hour.
There might be 0,1,2,3,...n measures for each hour of the day. Idea: Group them first. In the end, visualize the average.
*/

//We can use a hashmap to do this:
//Idea: {"16-11-23-1": [50,44]} for 16.11.2023, at 1am
//TODO: Iterate over the raw measures, extract moisture and store it in the hourMap like this: {"16-11-23-1": [50,44]}

// var hourMap = {};

// measures.forEach(el => {
//   const date = new Date(el.timeISO);
//   const hour = date.getHours();
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();

//   const key = `${day}-${month}-${year}-${hour}`;

//   if (hourMap[key] === undefined) {
//     hourMap[key] = [el.moisture];
//   } else {
//     hourMap[key].push(el.moisture);
//   }
// })

function transformMeasures(data, type) {
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


//Create Labels for the graph
//let chartLabels=[];
//Data for the graph:
//let chartData=[];

//Implement a function to calculate the average of an array
function calcAverage(arr){
    //TODO: Implement me
    return arr.reduce((a, b) => a+b, 0) / arr.length;
}


//Iterating over the <key,value> pairs topush keys to labels and measure averages to data
// for (let [key, value] of Object.entries(hourMap)) {
//     chartLabels.push(key);
//     chartData.push(calcAverage(value));
// }

//Chart.js Code

function createChart(chartLabels, chartData, type) {
  return new Chart(document.getElementById("chart"), {
      type: 'line',
      data: {
          labels: chartLabels,
          datasets: [{
              data: chartData,
              label: type,
              borderColor: "#00dd11",
              fill: false
          }]
      },
      options: {
          title: {
              display: true,
              text: `${type} over time`
          },
  
          responsive: true,
          maintainAspectRatio: false
      }
  });
}