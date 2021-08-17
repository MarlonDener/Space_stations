const MongoUser = require('../database/User')
const { hash, genSalt } = require('bcryptjs')
class UserController {
  async getAllUsers () {
    const users = await MongoUser.find().select(['_id', 'name', 'email'])
    return users
  }

  async findById (id) {
    const user = await MongoUser.findById(id)

    if (!user) {
      throw new Error('User does not exists')
    }
    return user
  }

  async createUser (name, email, password) {
    const salt = await genSalt(8)
    const hashedPassword = await hash(password, salt)

    const user = await MongoUser.create({ name, email, hashedPassword })

    return user
  }
}

module.exports = new UserController()
