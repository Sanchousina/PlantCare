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
app.post('/api/plants/', (req, res) => {
  const query = `INSERT INTO Plant 
  (plant_name, temperature_min, temperature_max, moisture_min, moisture_max, fertility_min, fertility_max, light_min, light_max)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const {plant_name, temperature_min, temperature_max, moisture_min, moisture_max, fertility_min, fertility_max, light_min, light_max} = req.body;
  db.run(query, [plant_name, temperature_min, temperature_max, moisture_min, moisture_max, fertility_min, fertility_max, light_min, light_max], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({
        data: {
          status: 'success'
        }
      })
    }
  })
})
app.get('/api/plants', (req, res) => {
  const query = 'SELECT * FROM Plant';
  db.all(query, (err, plants) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: {
          status: 'success',
          data: plants
        }
      })
    }
  })
})
app.post('/api/measurements', (req, res) => {
  const query = `INSERT INTO Measurement (plant_id, temperature, moisture, fertility, light)
                VALUES (?, ?, ?, ?, ?)`;
  const {plant_id, temperature, moisture, fertility, light} = req.body;

  db.run(query, [plant_id, temperature, moisture, fertility, light], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({
        data: {
          status: 'success'
        }
      })
    }
  })
})
app.get('/api/measurements/:plant_id', (req, res) => {
  const query = 'SELECT * FROM Measurement WHERE plant_id = ?';
  db.all(query, [req.params.plant_id], (err, measurements) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: {
          status: 'success',
          data: measurements
        }
      })
    }
  })
})

// Start the server
app.listen(8000, () => {
  console.log('Server is listening');
})

//TODO: Implement the Websocket