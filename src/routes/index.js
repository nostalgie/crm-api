const express = require('express')

const authorizationRouter = require('./authorization')
const ticketsRouter = require('./tickets')
const customersRouter = require('./customers')

const router = express.Router()

router.use(authorizationRouter)
router.use(ticketsRouter)
router.use(customersRouter)

module.exports = router
