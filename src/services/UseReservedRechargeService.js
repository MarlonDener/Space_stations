const MongoRecharge = require('../models/Recharge')
const { ApolloError } = require('apollo-server')

class UseReservedService {
  async handle (args, context) {
    const reserved = await MongoRecharge.findOne({
      reservationId: args.idReservation
    }).populate('client')

    if (!context.token) {
      throw new ApolloError('You are not authenticated', 'ALERT')
    }

    if (!reserved) {
      throw new ApolloError('Ops, reservation does not exist!')
    }
    const currentDate = new Date()

    if (new Date(reserved.initialDate) > currentDate && currentDate < new Date(reserved.endDate)) {
      throw new ApolloError('Ops, It is not among the time reserved for you')
    }

    if (reserved.isActiveRecharge) {
      throw new ApolloError('recharge is already in progress', 'You already started this recharge')
    }
    const result = []
    await reserved.updateOne({ isActiveRecharge: true })
    const InitialDate = reserved.initialDate.toLocaleString()
    const endDate = reserved.endDate.toLocaleString()

    result.push({
      client: reserved.client,
      endDate: endDate,
      initialDate: InitialDate,
      reservationId: reserved.reservationId
    })
    return result
  }
}

module.exports = new UseReservedService()
