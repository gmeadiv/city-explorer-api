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

function Forecast(name, description, date) {
  this.name = name;
  this.description = description;
  this.date = date;

  // console.log(this, '<---- OBJECT FUNCTION LOG ---<<<');
  Forecast.forecastArray.push(this);
  console.log(Forecast.forecastArray, '<---- ARRAY OBJECT LOG ---<<<');
};

Forecast.forecastArray = [];

app.get('/forecast', (request, response) => {
  // let searchQuery = request.query;
  let searchQuery;
  const cityInfo = forecast.find(city => city.searchQuery === searchQuery);
  
  response.send(cityInfo.city_name);

  const dayOneForecast = new Forecast(cityInfo.city_name, cityInfo.data[0].weather.description, cityInfo.data[0].valid_date);
  const dayTwoForecast = new Forecast(cityInfo.city_name, cityInfo.data[1].weather.description, cityInfo.data[1].valid_date);
  const dayThreeForecast = new Forecast(cityInfo.city_name, cityInfo.data[2].weather.description, cityInfo.data[2].valid_date);
  
  // console.log(dayOneForecast, dayTwoForecast, dayThreeForecast, '<--- FUNCTION CALL LOG ---<<<');
});

console.log(Forecast.forecastArray, '<---- ARRAY GLOBAL LOG ---<<<');

app.listen(PORT, () => console.log(`Listening on ${PORT}`));