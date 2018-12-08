const express = require('express')
const passport = require('passport')
const ticketsService = require('../lib/tickets')

const ticketsRouter = express.Router()

ticketsRouter.get('/tickets', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { query, user } = req
  const getResult = await ticketsService.getTickets(user, query.state)
  getResult.respond(res)
})

ticketsRouter.post('/tickets', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user, body } = req
  const createResult = await ticketsService.createTicket(user, body)
  createResult.respond(res)
})

ticketsRouter.put('/tickets/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user, body } = req
  const updateResult = await ticketsService.updateTicket(user, body)
  res.status(201).end(updateResult)
})

ticketsRouter.post('/tickets/finish', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { ticketId } = req.body
  await ticketsService.finishTicket(ticketId)
  res.end()
})

module.exports = ticketsRouter
