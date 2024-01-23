const express = require('express');
const path = require('path');
const { db, initializeDatabase } = require('./database.js');
const { setupWebSocket } = require('./websocket.js');
const plantRouter = require('./routes/plantRouter.js');
const measurementRouter = require('./routes/measurementsRouter.js');

const app = express();
initializeDatabase();

app.use(express.json());
//Serving static files in ./public (our frontend)
app.use('/', express.static(path.join(__dirname, '../public')));


//API Endpoints
app.use('/api/plants', plantRouter);
app.use('/api/measurements', measurementRouter);


// Start the server
app.listen(8000, () => {
  console.log('Server is listening');
})

setupWebSocket();

