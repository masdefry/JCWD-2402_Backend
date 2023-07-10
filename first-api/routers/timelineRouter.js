const express = require('express')
const Router = express.Router()

// Import Controller
const {timelineController} = require('./../controllers')

Router.post('/upload/:userId', timelineController.upload)
Router.get('/test', timelineController.test)

module.exports = Router