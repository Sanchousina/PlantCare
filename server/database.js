const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

function initializeDatabase() {
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
}

module.exports = {db, initializeDatabase}