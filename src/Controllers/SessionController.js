const MongoUser = require('../database/User')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const AuthConfig = require('../config/auth')

class AuthController {
  async signIn (email, password) {
    const user = await MongoUser.findOne({
      email
    })

    if (!user) {
      throw new Error('Incorrect email/password')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password')
    }

    const token = sign({
      email: user.email
    }, AuthConfig.jwt.secret, {
      subject: user._id,
      expiresIn: AuthConfig.jwt.expiresIn
    })

    return { token, user }
  }
}

module.exports = new AuthController()
