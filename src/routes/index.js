const express = require('express')

const authorizationRouter = require('./authorization')

const router = express.Router()

router.use(authorizationRouter)

module.exports = router
