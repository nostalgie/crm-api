const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Credentials } = require('../data-access/DAOs')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  const user = await Credentials.getByUsername(jwtPayload.username)

  if (!user.id) {
    return done()
  } else {
    const { username } = user
    const { id, type, adminRole } = jwtPayload
    return done(null, { id, username, type, role: adminRole })
  }
}))
