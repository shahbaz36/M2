const express = require('express');
const userController = require('../controllers/userController')

const Router= express.Router() ; 

Router.get('/test', userController.test );

module.exports = Router ; 

