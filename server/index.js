require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { init: initRoutes } = require('./routes');

const app = express();
port = 3000;

app.use(express.static('dist'));
app.listen(port, () => {
  console.log('Budgeting Server running on port', port);
});

(async function connectToDB() {
  try {
    console.log('Using database', process.env.MONGO_URI);
    const uri = process.env['MONGO_URI'];
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.log('MongoDB connection error', err);
  }
})().catch(console.dir);

initRoutes(app);

