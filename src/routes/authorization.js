const express = require('express')
const authorizationService = require('../lib/authorization')
const authorizationRouter = express.Router()

authorizationRouter.post('/login', async (req, res) => {
  const { username, password } = req.body

  const loginResult = await authorizationService.login(username, password)
  loginResult.respond(res)
})

module.exports = authorizationRouter
