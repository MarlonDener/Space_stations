const { verify } = require('jsonwebtoken')
const AuthConfig = require('../config/auth')

const authenticationAssurance = (context) => {
  const authHeader = context.token

  if (!authHeader) {
    return false
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, AuthConfig.jwt.secret)

    return !!decoded
  } catch (err) {
    throw new Error('Error')
  }
}

module.exports = authenticationAssurance
