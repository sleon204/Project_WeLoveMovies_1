// Destructure the PORT environment variable and set a default value of 5001 if it's not provided
const { PORT = 5001 } = process.env;

// Require the Express app created in the "app.js" file
const app = require("./app");

// Require the Knex connection established in the "db/connection.js" file
const knex = require("./db/connection");

// Listener function to log a message when the server starts listening on the specified port
const listener = () => console.log(`Listening on Port ${PORT}!`);

// Run the database migrations using Knex's "migrate.latest()" method
// This ensures that the database schema is up-to-date with the latest migrations
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    // Start the server and make it listen on the specified port
    app.listen(PORT, listener);
  })
  .catch(console.error);
