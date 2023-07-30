// Import the moviesService module to access functions for movie-related operations
const moviesService = require("./movies.service");

// Import the asyncErrorBoundary module to handle errors in asynchronous functions
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Middleware to handle the GET request to list movies.
 * If the 'is_showing' query parameter is true, calls moviesService.listShowingMovies() to get a list of currently showing movies.
 * If 'is_showing' is not provided or false, calls moviesService.listMovies() to get a list of all movies.
 * Responds with a JSON object containing the movie data.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function list(req, res, next) {
  const { is_showing } = req.query; // Destructure the 'is_showing' query parameter

  if (is_showing === "true") {
    // If 'is_showing' is true, call moviesService.listShowingMovies()
    try {
      const data = await moviesService.listShowingMovies();
      res.json({ data });
    } catch (error) {
      next(error);
    }
  } else {
    // If 'is_showing' is not provided or false, call moviesService.listMovies()
    try {
      const data = await moviesService.listMovies();
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Middleware to handle the GET request to retrieve a single movie by its movieId.
 * Calls moviesService.read(movieId) to get the movie data for the specified movieId.
 * If the movie data is not found, responds with a 404 error.
 * Otherwise, responds with a JSON object containing the movie data.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function read(req, res, next) {
  const movieId = req.params.movieId; // Destructure the 'movieId' from the request parameters
  const data = await moviesService.read(movieId); // Call moviesService.read(movieId) to get the movie data

  if (!data) {
    // If the movie data is not found, respond with a 404 error
    next({ status: 404, message: "Movie cannot be found." });
  } else {
    // If the movie data is found, respond with a JSON object containing the movie data
    res.json({ data });
  }
}

/**
 * Middleware to handle the GET request to list theaters where a specific movie is showing.
 * Calls moviesService.listShowingTheaters(movieId) to get a list of theaters showing the specified movie.
 * Responds with a JSON object containing the theater data.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function listTheaters(req, res, next) {
  const movieId = req.params.movieId; // Destructure the 'movieId' from the request parameters
  const data = await moviesService.listShowingTheaters(movieId); // Call moviesService.listShowingTheaters(movieId) to get the theater data

  // Respond with a JSON object containing the theater data
  res.json({ data });
}

/**
 * Middleware to handle the GET request to list reviews for a specific movie.
 * Calls moviesService.listReviews(movieId) to get a list of reviews for the specified movie.
 * Responds with a JSON object containing the review data.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function listReviews(req, res, next) {
  const movieId = req.params.movieId; // Destructure the 'movieId' from the request parameters
  const data = await moviesService.listReviews(movieId); // Call moviesService.listReviews(movieId) to get the review data

  // Respond with a JSON object containing the review data
  res.json({ data });
}

// Export the middleware functions with asyncErrorBoundary applied to handle errors
module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  listTheaters: asyncErrorBoundary(listTheaters),
  listReviews: asyncErrorBoundary(listReviews),
};
