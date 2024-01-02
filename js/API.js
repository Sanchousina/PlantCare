export class API {
  constructor(updateInterval) {
    setInterval(() => this.getData(), updateInterval);
  }
  async getData() {
    const measures = await (await fetch('http://127.0.0.1:5500/data.json')).json();

    const newDataEvent = new CustomEvent('newData', {
      detail: measures, 
      bubbles: true
    });
    
    document.dispatchEvent(newDataEvent);
  }
}