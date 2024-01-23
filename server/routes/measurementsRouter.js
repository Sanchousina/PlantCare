const express = require('express');
const router = express.Router();
const { db } = require('../database.js');

router.post('/', (req, res) => {
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
router.get('/:plant_id', (req, res) => {
  const query = 'SELECT *, timestamp as timeISO FROM Measurement WHERE plant_id = ?';
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

module.exports = router;