// If the environment variable USER exists, load environment variables from .env file
if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// Import routers for different endpoints
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount routers to specific paths
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Not-found error handler: If a request reaches this middleware and none of the previous routes match,
// it means the requested resource is not found, so a 404 error response is sent.
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler: If an error occurs in any of the previous middlewares or routes,
// this error handler will handle it and send an appropriate error response.
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

// Export the Express app to be used in other files
module.exports = app;
