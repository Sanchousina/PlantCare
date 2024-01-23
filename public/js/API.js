export class API {
  constructor(updateInterval, base_url, PLANT_ID) {
    this.PLANT_ID = PLANT_ID;
    this.base_url = base_url;
    setInterval(() => this.getData(), updateInterval);
  }

  async getData(PLANT_ID) {
    const response = await (await fetch(`${this.base_url}/measurements/${PLANT_ID}`)).json();

    const newDataEvent = new CustomEvent('newData', {
      detail: response.data.data, 
      bubbles: true
    });
    
    document.dispatchEvent(newDataEvent);
  }
}