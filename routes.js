const axios = require('axios');

async function handleGetMovies(req, res) {
  // let {searchQuery} = req.query; 
  // const moviesURL = `https://api.themoviedb.org/3/search/movie?key=${process.env.TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  // const moviesResponse = await axios.get(moviesURL);
  // console.log(moviesResponse, '<---- MOVIES RESPONSE LOG ---<<<')


  res.status(200).send('YOU MADE IT');
}

module.exports = {handleGetMovies}