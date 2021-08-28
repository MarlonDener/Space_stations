const MongoRecharge = require('../models/Recharge')
const { ApolloError } = require('apollo-server')
const RechargeUtils = require('../utils/RechargeData')

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
    RechargeUtils.changeWhenRechargeOver()

    const currentDate = new Date()

    if (reserved.isActiveRecharge) {
      throw new ApolloError(`Hello ${reserved.client.name}! You already started this recharge`, 'Recharge already started')
    }

    // boa!
    if (currentDate > new Date(reserved.initialDate) && currentDate < new Date(reserved.endDate)) {
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
    } else {
      throw new ApolloError('Ops, It is not among the time reserved for you')
    }
  }
}
module.exports = new UseReservedService()
