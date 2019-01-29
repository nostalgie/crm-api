const express = require('express')
const passport = require('passport')
const HttpCodes = require('http-status-codes')
const ticketsService = require('../lib/tickets')

const ticketsRouter = express.Router()

ticketsRouter.get('/tickets', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { query, user } = req
    const getResult = await ticketsService.getTickets(user, query)
    res.send(getResult)
  } catch (error) {
    next(error)
  }
})

ticketsRouter.get('/tickets/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { params } = req
    const getResult = await ticketsService.getTicketInfo(params.id)
    res.send(getResult)
  } catch (error) {
    next(error)
  }
})

ticketsRouter.post('/tickets', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { user, body } = req
    const createResult = await ticketsService.createTicket(user, body)
    res.status(HttpCodes.CREATED).send(createResult)
  } catch (error) {
    next(error)
  }
})

ticketsRouter.put('/tickets/update', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { user, body } = req
    const updateResult = await ticketsService.updateTicket(user, body)
    res.status(HttpCodes.CREATED).send(updateResult)
  } catch (error) {
    next(error)
  }
})

ticketsRouter.post('/tickets/finish', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { ticketId } = req.body
    await ticketsService.finishTicket(ticketId)
    res.end()
  } catch (error) {
    next(error)
  }
})

ticketsRouter.post('/tickets/rate', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { ticketId, rating } = req.body
    await ticketsService.rateTicket(ticketId, rating)
    res.end()
  } catch (error) {
    next(error)
  }
})

module.exports = ticketsRouter
