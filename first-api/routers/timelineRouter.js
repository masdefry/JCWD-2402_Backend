const express = require('express')
const Router = express.Router()

// Import Controller
const {timelineController} = require('./../controllers')

Router.post('/upload/:userId', timelineController.upload)
module.exports = Router