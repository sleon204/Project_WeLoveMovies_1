const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * Retrieves a list of all theaters from the database.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>} - A Promise that resolves once the theaters list is sent in the response.
 */
async function list(req, res) {
  // Call the theatersService.list() function to retrieve all theaters.
  const data = await theatersService.list();
  
  // Send the theaters data in the response as a JSON object.
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
