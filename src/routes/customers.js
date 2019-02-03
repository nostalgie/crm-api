const express = require('express')
const passport = require('passport')
const customersService = require('../lib/customers')
const customersRouter = express.Router()

customersRouter.get('/customers', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const { user } = req

    const getResult = await customersService.getDependentCustomers(user.id)
    res.send(getResult)
  } catch (error) {
    next(error)
  }
})

module.exports = customersRouter
