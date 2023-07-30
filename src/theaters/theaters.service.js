const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Define a function called 'reduceMovies' that uses the 'reduceProperties' utility function
// to extract specific movie properties and map them to their respective theater_ids.
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  isShowing: ["movies", null, "is_showing"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

// Define a function called 'list' that fetches data from the database by joining the 'theaters' table
// with the 'movies_theaters' and 'movies' tables and selects all columns.
// Then, the 'reduceMovies' function is applied to the result to organize the data by theater_ids and their associated movies.
function list() {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select("*")
    .then(reduceMovies);
}

module.exports = {
  list,
};
