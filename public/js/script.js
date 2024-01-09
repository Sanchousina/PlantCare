import { Dashboard } from "./Dashboard.js";
import { API } from "./API.js";

let dashboard= new Dashboard("moisturePanel", "lightPanel", "temperaturePanel", "humidityPanel");

let api = new API(5000);
api.getData();


