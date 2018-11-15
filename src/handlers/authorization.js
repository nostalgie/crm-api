const authorizationService = require('../services/authorization')

const login = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body

  const loginResult = await authorizationService.login(username, password)
  res.end(loginResult)
}

module.exports = {
  login
}
