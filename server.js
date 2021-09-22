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

function Forecast(name, dayOne, dayTwo, dayThree) {
  this.name = name;
  this.descriptionOne = dayOne[0];
  this.dateOne = dayOne[1];

  this.descriptionTwo = dayTwo[0];
  this.dateTwo = dayTwo[1];

  this.descriptionThree = dayThree[0];
  this.dateThree = dayThree[1];

  console.log(this, '<---- OBJECT FUNCTION LOG ---<<<');
  Forecast.forecastArray.push(this);
};

Forecast.forecastArray = [];
console.log(Forecast.forecastArray, '<---- ARRAY LOG ---<<<');

app.get('/forecast', (request, response) => {
  // let searchQuery = request.query;
  let searchQuery;
  const cityInfo = forecast.find(city => city.searchQuery === searchQuery);

  const dayOne = [];
  const dayTwo = [];
  const dayThree = [];

  dayOne.push(cityInfo.data[0].weather.description, cityInfo.data[0].valid_date);
  dayTwo.push(cityInfo.data[1].weather.description, cityInfo.data[1].valid_date);
  dayThree.push(cityInfo.data[2].weather.description, cityInfo.data[2].valid_date);

  // console.log(dayOne, dayTwo, dayThree, '<--- DAY ARRAYS LOG ---<<<');
  
  response.send(cityInfo.city_name);

  const city = new Forecast(cityInfo.city_name, dayOne, dayTwo, dayThree);
  
  console.log(city, '<--- CITY OBJECT LOG ---<<<');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));