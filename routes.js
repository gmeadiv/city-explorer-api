const axios = require('axios');

const cache = require('./cache.js')

function getHome(request, response) {
  console.log('YOU ARE HOME');
  response.status(200).send('Welcome to the Void')
}

async function getForecast(request, response) {
  let searchQuery = request.query.searchQuery;
  let lat = request.query.latitude;
  let lon = request.query.longitude;

  console.log(searchQuery, '<---- FORECAST SEARCH QUERY LOG');
  
  const forecastURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
  
  const forecastResponse = await axios.get(forecastURL);

  response.status(200).send(forecastResponse.data);
}

async function getYelp(request, response) {
  let searchQuery = request.query.searchQuery;
  let lat = request.query.latitude;
  let lon = request.query.longitude;

  console.log(searchQuery, lat, lon, '<---- YELP SEARCH QUERY LOG');

  const yelpURL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;

  console.log(yelpURL, '<---- YELP URL LOG ---<<<');

  const yelpResponse = await axios.get(yelpURL);

  console.log(yelpResponse, '<---- YELP RESPONSE LOG ---<<<');

  response.status(200).send('WELCOME TO YELP REVIEW')
}

async function getMovies(request, response) {
  let {searchQuery} = request.query;
  const key = 'movies-' + {searchQuery};

  console.log(searchQuery, '<---- MOVIES SEARCH QUERY LOG ---<<<')

  const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchQuery}&page=1`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 5000)) {
    console.log('--> CACHE HIT LOG <--')
  } else {
    console.log('--> CACHE MISS LOG <--');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(moviesURL)
    .then(response => parseMovies(response))
  }

  response.status(200).send(cache[key].data);
}

function parseMovies(movieData) {
  try {
    const movieSummaries = movieData.data.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  } 
}

class Movie {
  constructor(movie) {
    // console.log(movie, '<---- WHAT IS PASSING INTO THE CONSTRUCTOR LOG ---<<<');
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.image = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    this.avgVote = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.popularity = movie.popularity;
    this.releaseDate = movie.release_date;
  }
}

module.exports = {getHome, getForecast, getMovies, getYelp}