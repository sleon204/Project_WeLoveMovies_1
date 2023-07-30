const router = require("express").Router();

// Import the movie controller module that contains the functions to handle movie-related requests
const controller = require("./movies.controller");

// Import the methodNotAllowed middleware to handle unsupported HTTP methods
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route: GET /movies
// Description: This route is used to retrieve a list of all movies.
router
  .route("/")
  .get(controller.list) // Call the 'list' function from the 'movies.controller' module to get the list of movies
  .all(methodNotAllowed); // Apply the methodNotAllowed middleware to handle unsupported HTTP methods

// Route: GET /movies/:movieId
// Description: This route is used to retrieve information about a specific movie based on its 'movieId'.
router
  .route("/:movieId")
  .get(controller.read) // Call the 'read' function from the 'movies.controller' module to get movie details by 'movieId'
  .all(methodNotAllowed); // Apply the methodNotAllowed middleware to handle unsupported HTTP methods

// Route: GET /movies/:movieId/theaters
// Description: This route is used to retrieve a list of theaters showing a specific movie based on its 'movieId'.
router
  .route("/:movieId/theaters")
  .get(controller.listTheaters) // Call the 'listTheaters' function from the 'movies.controller' module to get theaters showing the movie
  .all(methodNotAllowed); // Apply the methodNotAllowed middleware to handle unsupported HTTP methods

// Route: GET /movies/:movieId/reviews
// Description: This route is used to retrieve a list of reviews for a specific movie based on its 'movieId'.
router
  .route("/:movieId/reviews")
  .get(controller.listReviews) // Call the 'listReviews' function from the 'movies.controller' module to get reviews for the movie
  .all(methodNotAllowed); // Apply the methodNotAllowed middleware to handle unsupported HTTP methods

module.exports = router;
