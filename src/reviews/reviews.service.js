const knex = require("../db/connection");

/**
 * Deletes a review with the specified reviewId from the "reviews" table.
 * @param {number} reviewId - The ID of the review to be deleted.
 * @returns {Promise<number>} - The number of deleted rows (should be 1 if successful).
 */
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

/**
 * Retrieves a single review with the specified reviewId from the "reviews" table.
 * @param {number} reviewId - The ID of the review to retrieve.
 * @returns {Promise<Object>} - The review object representing the matching review.
 */
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

/**
 * Updates an existing review in the "reviews" table with the data provided in the updatedReview object.
 * @param {Object} updatedReview - The updated review object with the updated properties.
 * @returns {Promise<Object>} - The updated review object representing the modified review.
 */
async function update(updatedReview) {
  await knex("reviews").where({ review_id: updatedReview.review_id }).update(updatedReview);

  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .first();
}

/**
 * Retrieves the critic information with the specified criticId from the "critics" table.
 * @param {number} criticId - The ID of the critic to retrieve.
 * @returns {Promise<Object>} - The critic object representing the matching critic.
 */
function readCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

module.exports = {
  destroy,
  read,
  update,
  readCritic,
};
