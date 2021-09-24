const axios = require('axios');

function getHome(request, response) {
  console.log('YOU ARE HOME');
  response.status(200).send('Welcome to the Void')
}

// async function getForecast(request, response) {
//   let searchQuery = request.query.searchQuery;
//   response.status(200).send(request.query.searchQuery, '<---- SEARCH QUERY LOG ---<<<');
//   const forecastURL = forecast.find(city => city.city_name === searchQuery);

//   console.log(forecastURL, '<---- FORECASTURL LOG ---<<<');

//   https://api.weatherbit.io/v2.0/current?lat=31.95&lon=35.91&key=58ed32f63be44a96927ed628f2284360%09

//   try{
//     const forecastArray = cityInfo.data.map(item => new Forecast(item.valid_date, item.weather.description));
//     response.status(200).send(forecastArray);
//   } catch(error) {
//     console.log(error, '<---- ERROR LOG ---<<<')
//   }
// }

async function getMovies(request, response) {
  let {searchQuery} = request.query; 

  console.log(searchQuery, '<---- MOVIES searchQuery LOG ---<<<')

  const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchQuery}&page=1`;

  console.log(moviesURL, '<---- MOVIES URL LOG ---<<<');

  const moviesResponse = await axios.get(moviesURL);

  console.log(moviesResponse.data, '<---- MOVIES RESPONSE LOG ---<<<')

  response.status(200).send(moviesResponse.data.results);
}

module.exports = {getHome, getMovies}