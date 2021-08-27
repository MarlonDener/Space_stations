const { verify } = require('jsonwebtoken')

const AuthenticationAssurance = (context) => {
  const authHeader = context.token

  if (!authHeader) {
    return false
  }

  const [, token] = authHeader.split(' ')

  try {
    // acho que faltou usar o secret do config aqui
    const decoded = verify(token, 'c8f759a539858b08e9e46251b1ae9f09')

    return !!decoded
  } catch (err) {
    throw new Error('Error')
  }
}

module.exports = AuthenticationAssurance
