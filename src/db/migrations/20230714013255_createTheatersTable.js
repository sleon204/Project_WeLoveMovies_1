/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Create the 'theaters' table
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary(); // Primary key for theater
    table.string("name"); // Theater name
    table.string("address_line_1"); // First line of the theater's address
    table.string("address_line_2"); // Second line of the theater's address
    table.string("city"); // City where the theater is located
    table.string("state"); // State where the theater is located
    table.string("zip"); // Zip code where the theater is located
    table.timestamps(true, true); // Timestamps for creation and update
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("theaters"); // Drop the 'theaters' table
};
