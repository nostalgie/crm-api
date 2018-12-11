const express = require('express')

const authorizationRouter = require('./authorization')
const ticketsRouter = require('./tickets')

const router = express.Router()

router.use(authorizationRouter)
router.use(ticketsRouter)

module.exports = router
