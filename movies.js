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

module.exports = {Movie}