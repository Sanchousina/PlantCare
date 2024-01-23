export class API {
  constructor(updateInterval, base_url, PLANT_ID) {
    this.PLANT_ID = PLANT_ID;
    this.base_url = base_url;
    setInterval(() => this.getData(PLANT_ID), updateInterval);
    this.getPlant(PLANT_ID);
  }

  async getData(PLANT_ID) {
    const response = await (await fetch(`${this.base_url}/measurements/${PLANT_ID}`)).json();

    const newDataEvent = new CustomEvent('newData', {
      detail: response.data.data, 
      bubbles: true
    });
    
    document.dispatchEvent(newDataEvent);
  }

  async getPlant(PLANT_ID) {
    const response = await (await fetch(`${this.base_url}/plants/${PLANT_ID}`)).json();

    const newDataEvent = new CustomEvent('plantInfo', {
      detail: response.data.data, 
      bubbles: true
    });
    
    document.dispatchEvent(newDataEvent);
    console.log(response.data.data);
  }
}