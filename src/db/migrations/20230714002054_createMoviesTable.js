/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Create the 'movies' table
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary(); // Primary key
    table.string("title"); // Movie title
    table.integer("runtime_in_minutes"); // Movie runtime in minutes
    table.string("rating"); // Movie rating
    table.text("description"); // Movie description
    table.string("image_url"); // Movie poster image URL
    table.timestamps(true, true); // Timestamps for creation and update
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("movies"); // Drop the 'movies' table
};
