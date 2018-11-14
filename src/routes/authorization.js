const express = require('express')
const authorizationHandler = require('../handlers/authorization')
const authorizationRouter = express.Router()

authorizationRouter.post('/login', authorizationHandler.login)

module.exports = authorizationRouter
