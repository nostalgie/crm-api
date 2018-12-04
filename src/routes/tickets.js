const express = require('express')
const passport = require('passport')
const ticketsService = require('../lib/tickets')

const ticketsRouter = express.Router()

ticketsRouter.post('/tickets', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user, body } = req
  const createResult = await ticketsService.createTicket(user, body)
  createResult.respond(res)
})

module.exports = ticketsRouter
