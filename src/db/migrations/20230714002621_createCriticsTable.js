/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Create the 'critics' table
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary(); // Primary key for critic
    table.string("preferred_name"); // Critic's preferred first name
    table.string("surname"); // Critic's last name
    table.string("organization_name"); // Name of the organization the critic works for
    table.timestamps(true, true); // Timestamps for creation and update
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("critics"); // Drop the 'critics' table
};
