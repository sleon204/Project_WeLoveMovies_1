const knex = require("../db/connection");

/**
 * Function to get a list of movies currently showing in any theater.
 * @returns {Promise<Array>} A promise that resolves to an array of movies currently showing.
 */
function listShowingMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

/**
 * Function to get a list of theaters where a specific movie is currently showing.
 * @param {number} movieId - The ID of the movie for which to find theaters.
 * @returns {Promise<Array>} A promise that resolves to an array of theaters showing the movie.
 */
function listShowingTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId });
}

/**
 * Function to get a list of all movies in the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all movies.
 */
function listMovies() {
  return knex("movies").select("*");
}

/**
 * Function to retrieve details of a specific movie based on its movieId.
 * @param {number} movieId - The ID of the movie to retrieve details for.
 * @returns {Promise<Object>} A promise that resolves to the movie details.
 */
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

/**
 * Function to retrieve a list of reviews for a specific movie based on its movieId.
 * @param {number} movieId - The ID of the movie for which to retrieve reviews.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews for the movie.
 */
async function listReviews(movieId) {
  const reviews = await knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId });

  return reviews.map((review) => {
    return {
      ...review,
      critic: {
        critic_id: review.critic_id,
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
      },
    };
  });
}

module.exports = {
  listShowingMovies,
  listShowingTheaters,
  listMovies,
  read,
  listReviews,
};
