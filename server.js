'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const handlerFunctions = require('./routes.js');

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get('/', handlerFunctions.getHome);

app.get('/forecast', handlerFunctions.getForecast);

app.get('/movies', handlerFunctions.getMovies);

app.listen(PORT, () => console.log('Listening on ' + PORT));