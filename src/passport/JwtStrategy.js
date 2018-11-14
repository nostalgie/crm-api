const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  console.log(jwtPayload)
  return done()
}))
