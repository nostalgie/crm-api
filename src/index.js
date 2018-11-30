require('dotenv').config()
const port = process.env.PORT || 3001

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const router = require('./routes')
const errorMiddleware = require('./utils/errorMiddleware')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(router)
app.use(errorMiddleware)

app.listen(port)
