const authorizationService = require('../services/authorization')

const login = async (req, res) => {
  const { username, password } = req.body

  const loginResult = await authorizationService.login(username, password)
  res.end(loginResult)
}

module.exports = {
  login
}
