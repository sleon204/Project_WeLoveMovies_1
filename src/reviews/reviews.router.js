const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

/**
 * Route handler for the "/reviews/:reviewId" endpoint.
 * Sets up PUT and DELETE requests for the specified endpoint, using the corresponding functions from the controller.
 * All other HTTP methods are handled by the "methodNotAllowed" middleware, returning a 405 Method Not Allowed response.
 */
router
  .route("/:reviewId")
  .put(controller.update) // Handles PUT requests for updating a review.
  .delete(controller.deleteReview) // Handles DELETE requests for deleting a review.
  .all(methodNotAllowed); // Handles all other HTTP methods with a 405 Method Not Allowed response.

module.exports = router;
