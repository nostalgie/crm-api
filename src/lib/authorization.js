const jwt = require('jsonwebtoken')
const { User } = require('../data-access')
const { sha512 } = require('../utils/createHash')
const responseTypes = require('../constants/responseTypes')
const Response = require('../responses/Response')

const login = async (username, password) => {
  try {
    const user = await User.findBy('username', username)

    if (!user) {
      return new Response(responseTypes.INVALID_CREDENTIALS)
    }

    const { hash, salt } = user

    const hashToCompare = sha512(password, salt)

    if (hash !== hashToCompare) {
      return new Response(responseTypes.INVALID_CREDENTIALS)
    }

    const payload = {
      user: user.id,
      username: user.username
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })

    return new Response({ ...responseTypes.AUTHORIZATION_SUCCESS.code, payload: { token } })
  } catch (e) {
    console.log(e.stack)
  }
}

module.exports = {
  login
}
