const MongoUser = require('../models/User')
const { hash, genSalt } = require('bcryptjs')

class CreateUserService {
  async handle (args) {
    const salt = await genSalt(8)
    const hashedPassword = await hash(args.password, salt)
    const { name, email } = args
    const user = await MongoUser.create({ name: name, email: email, password: hashedPassword })
    return await user
  }
}

module.exports = new CreateUserService()
