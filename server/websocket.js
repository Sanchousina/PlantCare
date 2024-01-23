const WebSocket = require('ws');

function setupWebSocket() {
  const ws = new WebSocket('ws://research.uber.space/plant-websocket', {followRedirects: true});

  ws.on('open', (e) => {
    console.log('Connected to WebSocket server!');
  });

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString('utf-8'));
    console.log(message);
  });

  ws.on('close', (e) => {
    console.log('COnnection closed');
  })
}

module.exports = {setupWebSocket};
