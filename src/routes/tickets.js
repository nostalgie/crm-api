const express = require('express')
const passport = require('passport')
const ticketsService = require('../lib/tickets')

const ticketsRouter = express.Router()

ticketsRouter.post('/tickets', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user, body } = req
  const result = await ticketsService.createTicket(user, body)
  console.log(result)
  res.end()
})

module.exports = ticketsRouter
