const jwt = require('jsonwebtoken')
const { User } = require('../data-access')
const { sha512 } = require('../utils/createHash')

const login = async (username, password) => {
  try {
    console.log(username)
    const user = await User.findByUsername(username)
    const { hash, salt } = user

    const hashToCompare = sha512(password, salt)

    let token = ''
    if (hash === hashToCompare) {
      const payload = {
        user: user.id,
        username: user.username
      }

      token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1y'
      })
    }

    return token
  } catch (e) {
    console.log(e.stack)
  }
}

module.exports = {
  login
}
