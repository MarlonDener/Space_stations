const { sign } = require('jsonwebtoken')
const AuthConfig = require('../config/auth')
const MongoUser = require('../models/User')
const { compare } = require('bcryptjs')

class AuthenticateUserService {
  async handle (args) {
    const user = await MongoUser.findOne({
      email: args.email
    })

    if (!user) {
      throw new Error('Incorrect email/password')
    }

    const passwordMatched = await compare(args.password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password')
    }

    const token = sign({
      email: user.email
    }, AuthConfig.jwt.secret, {
      subject: `${user._id}`,
      expiresIn: AuthConfig.jwt.expiresIn
    })

    return { token, user }
  }
}

module.exports = new AuthenticateUserService()
