'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const forecast = require('./weather.json');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('you made it!')
});

function Forecast(item) {
  this.description = item.weather.description;
  this.date = item.valid_date;

  // console.log(this, '<---- OBJECT FUNCTION LOG ---<<<');
};

app.get('/forecast', (request, response) => {
  let {searchQuery} = request.query;
    console.log(request.query, '<---- QUERY LOG ---<<<');
  const cityInfo = forecast.find(city => city.city_name === searchQuery);

  try{
    const forecastArray = cityInfo.data.map(item => new Forecast(item));
    response.status(200).send(forecastArray);
  } catch(error) {
    console.log(error, 'ERROR LOG')
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));