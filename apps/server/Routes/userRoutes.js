const express = require("express");
const userController = require("../controllers/userController");
const { checkAuth } = require("../controllers/authController");

const Router = express.Router();

Router.use(checkAuth);
Router.get("/test", userController.test);

module.exports = Router;
