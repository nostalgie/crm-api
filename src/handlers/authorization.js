const authorizationService = require('../services/authorization')

const login = async (req, res) => {
  const { username, password } = req.body

  const loginResult = await authorizationService.login(username, password)
  loginResult.send(res)
}

module.exports = {
  login
}
