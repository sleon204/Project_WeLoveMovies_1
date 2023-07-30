/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Create the 'reviews' table
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary(); // Primary key for review
    table.text("content"); // Review content (written in markdown)
    table.integer("score"); // Score given to the movie by the critic (integer)
    table.integer("critic_id").unsigned().notNullable(); // Foreign key referencing critic_id from critics table (unsigned and not nullable)
    table
      .foreign("critic_id")
      .references("critics.critic_id")
      .onDelete("CASCADE"); // Foreign key constraint referencing critics table with cascading delete
    table.integer("movie_id").unsigned().notNullable(); // Foreign key referencing movie_id from movies table (unsigned and not nullable)
    table.foreign("movie_id").references("movies.movie_id").onDelete("CASCADE"); // Foreign key constraint referencing movies table with cascading delete
    table.timestamps(true, true); // Timestamps for creation and update
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviews"); // Drop the 'reviews' table
};
