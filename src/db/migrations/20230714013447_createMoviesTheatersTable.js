/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Create the 'movies_theaters' table
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable(); // Foreign key referencing movie_id from movies table (unsigned and not nullable)
    table.foreign("movie_id").references("movies.movie_id").onDelete("CASCADE"); // Foreign key constraint referencing movies table with cascading delete
    table.integer("theater_id").unsigned().notNullable(); // Foreign key referencing theater_id from theaters table (unsigned and not nullable)
    table.foreign("theater_id").references("theaters.theater_id").onDelete("CASCADE"); // Foreign key constraint referencing theaters table with cascading delete
    table.boolean("is_showing"); // Represents whether the movie is currently showing at the theater
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters"); // Drop the 'movies_theaters' table
};
