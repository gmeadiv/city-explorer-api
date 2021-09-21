'use strict';

require('dotenv').config();

const express = require('express');
const data = require('./data.json');
const cors = require('cors');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('you made it!')
});

app.get('/data', (request, response) => {

  const veg = request.query.veg === true;

  const veggies = data.find(food => food.veg === true);

  response.send(veggies)
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));