export class API {
  constructor(updateInterval, base_url) {
    this.base_url = base_url;
    setInterval(() => this.getData(), updateInterval);
  }
  async getData() {
    const measures = await (await fetch(`${this.base_url}/api/measurements`)).json();

    const newDataEvent = new CustomEvent('newData', {
      detail: measures, 
      bubbles: true
    });
    
    document.dispatchEvent(newDataEvent);
  }
}