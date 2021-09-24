'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const forecast = require('./weather.json');
const handlerFunctions = require('./routes.js');

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get('/', handlerFunctions.getHome);

// function Forecast(date, description) {
//   this.description = description;
//   this.date = date;
// };

// app.get('/forecast', handlerFunctions.getForecast);

app.get('/movies', handlerFunctions.getMovies);

app.listen(PORT, () => console.log('Listening on ' + PORT));