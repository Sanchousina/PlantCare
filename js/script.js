import { measures } from "./data.js";
import { Dashboard } from "./Dashboard.js";

let dashboard= new Dashboard("moisturePanel", "lightPanel", "temperaturePanel", "humidityPanel");

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


