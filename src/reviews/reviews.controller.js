const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Middleware function to check if a review with the given reviewId exists.
 * If the review exists, it attaches the review to the res.locals object and calls the next middleware.
 * If the review does not exist, it calls the next middleware with an error indicating that the review cannot be found.
 */
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

/**
 * Handler function to delete a review.
 * Uses the reviewsService to delete the review with the review_id provided in res.locals.review.
 * Sends a 204 No Content response after successful deletion.
 */
async function deleteReview(req, res) {
  await reviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

/**
 * Handler function to update a review.
 * Checks if the review exists (using res.locals.review) and updates it with the data provided in req.body.data.
 * After updating, it fetches the updated review with critic details and sends the response with the updated review and critic information.
 */
async function update(req, res) {
  const reviewToUpdate = res.locals.review;

  if (!reviewToUpdate) {
    return res.status(404).json({ error: "Review cannot be found." });
  }

  const updatedReview = {
    ...reviewToUpdate,
    ...req.body.data,
  };

  const updatedReviewWithCritic = await reviewsService.update(updatedReview);
  const critic = await reviewsService.readCritic(updatedReview.critic_id);

  const response = {
    data: {
      ...updatedReviewWithCritic,
      critic: critic,
    },
  };
  res.json(response);
}

module.exports = {
  deleteReview: [reviewExists, asyncErrorBoundary(deleteReview)],
  update: [reviewExists, asyncErrorBoundary(update)],
};
