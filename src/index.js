require('dotenv').config()
const port = process.env.PORT || 3001

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const router = require('./routes')

const app = express()
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(router)

app.listen(port)
