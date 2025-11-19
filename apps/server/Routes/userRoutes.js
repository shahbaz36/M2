const express = require("express");
const userController = require("../controllers/userController");
const { checkAuth } = require("../controllers/authController");

const Router = express.Router();

Router.use(checkAuth);
Router.post("/sync", userController.sync);
Router.get("/me", userController.getMe);

module.exports = Router;
