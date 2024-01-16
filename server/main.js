const fs = require('fs');
const express = require('express');
const path = require('path');
const measurements = require('../data.json');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./database.db');

//TODO: Create tables, if they do not exist
const queryCreatePlantTable = fs.readFileSync('./sqlTables/createPlantTable.sql', 'utf-8');
const queryCreateMeasurementTable = fs.readFileSync('./sqlTables/createMeasurementTable.sql', 'utf-8');
db.run(queryCreatePlantTable, (err) => {
  if(err) {
    console.log(err);
  }else {
    console.log('Plant Table created');
  }
});

db.run(queryCreateMeasurementTable, (err) => {
  if(err) {
    console.log(err);
  }else {
    console.log('Mesaurement Table created');
  }
})

app.use(express.json());
//Serving static files in ./public (our frontend)
app.use('/', express.static(path.join(__dirname, '../public')));


//API Endpoints
app.get('/api/measurements/', (req, res) => {
  res.send(measurements);
})

// Start the server
app.listen(8000, () => {
  console.log('Server is listening');
})

//TODO: Implement the Websocket