const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Sets up a GET request for the /theaters endpoint and calls the controller.list function.
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
