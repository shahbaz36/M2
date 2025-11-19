const express = require("express");
const vapiController = require("../controllers/vapiController");
const { checkAuth } = require("../controllers/authController");

const Router = express.Router();

Router.use(checkAuth);

Router.route("/generate").post(vapiController.generate);

module.exports = Router;
