import { Dashboard } from "./Dashboard.js";
import { API } from "./API.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const PLANT_ID = urlParams.get('plant_id') || 1;

let dashboard= new Dashboard("moisturePanel", "lightPanel", "temperaturePanel", "fertilityPanel");

let api = new API(5000, 'http://localhost:8000/api', PLANT_ID);

api.getData(PLANT_ID);


