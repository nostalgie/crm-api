const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Credentials } = require('../data-access')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  console.log(jwtPayload)
  const user = await Credentials.getByUsername(jwtPayload.username)

  if (!user.id) {
    return done()
  } else {
    const { id, username } = user
    const { role } = jwtPayload
    return done(null, { id, username, role })
  }
}))
