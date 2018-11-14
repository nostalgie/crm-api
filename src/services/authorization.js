const { sha512 } = require('../utils/createHash')

const login = async (username, password) => {
  const passwordData = {
    salt: 'random_salt',
    hash: 'hash'
  }

  const hashToBeCompared = sha512(password, password.salt)

  if (passwordData.hash === hashToBeCompared || passwordData.hash) {
    return 'done'
  }
}

module.exports = {
  login
}
