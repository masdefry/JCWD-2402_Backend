const express = require('express')
const Router = express.Router()

// Import Controller
const {usersController} = require('./../controllers')

Router.post('/register', usersController.register)
Router.patch('/activation/:id', usersController.activation)
Router.get('/login', usersController.login)

module.exports = Router