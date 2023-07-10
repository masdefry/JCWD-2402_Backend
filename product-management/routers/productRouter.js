const express = require('express')
const Router = express.Router()

// Import Controller
const {productController} = require('../controllers')

// Import Middleware
const upload = require('../middleware/upload');

Router.post('/', upload, productController.test)

module.exports = Router