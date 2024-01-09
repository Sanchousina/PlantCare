const express = require('express');
const path = require('path');
const measurements = require('../data.json');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api/measurements/', (req, res) => {
  res.send(measurements);
})

app.listen(8000, () => {
  console.log('Server is listening');
})