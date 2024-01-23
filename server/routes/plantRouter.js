const express = require('express');
const router = express.Router();
const { db } = require('../database.js');

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
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

router.get('/:plant_id', (req, res) => {
  const query = 'SELECT * FROM Plant WHERE plaint_id = ?';
  db.all(query, [req.params.plant_id], (err, plant) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: {
          status: 'success',
          data: plant[0]
        }
      })
    }
  })
})

module.exports = router;