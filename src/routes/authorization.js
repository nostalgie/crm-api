const express = require('express')
const authorizationService = require('../lib/authorization')
const authorizationRouter = express.Router()

authorizationRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const loginResult = await authorizationService.login(username, password)
    res.send(loginResult)
  } catch (error) {
    next(error)
  }
})

module.exports = authorizationRouter
