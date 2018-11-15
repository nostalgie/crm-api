const jwt = require('jsonwebtoken')
const { User } = require('../data-access/mysql')
const { sha512 } = require('../utils/createHash')

const login = async (username, password) => {
  const user = await User.findByUsername(username)
  const { hash, salt } = user

  const hashToBeCompared = sha512(password, salt)

  let token = ''
  if (hash === hashToBeCompared) {
    const payload = {
      user: user.id,
      username: user.username
    }

    token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })
  }

  return token
}

module.exports = {
  login
}
