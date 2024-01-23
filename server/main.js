const express = require('express');
const path = require('path');
const { db, initializeDatabase } = require('./database.js');
const { setupWebSocket } = require('./websocket.js');
const plantRouter = require('./routes/plantRouter.js');

const app = express();
initializeDatabase();

app.use(express.json());
//Serving static files in ./public (our frontend)
app.use('/', express.static(path.join(__dirname, '../public')));


//API Endpoints

app.use('/api/plants', plantRouter);

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

setupWebSocket();

