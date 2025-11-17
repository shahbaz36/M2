const express = require("express");
const vapiController = require("../controllers/vapiController");
const {checkAuth} = require("../controllers/authController")

const Router = express.Router();

Router.use(checkAuth);

Router.route("/generate")
  .get(vapiController.generate)
  .post(vapiController.handleInc);

module.exports = Router;
