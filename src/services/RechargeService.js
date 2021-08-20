const MongoRecharge = require('../models/Recharge')
const RechargeUtils = require('../utils/RechargeData')
const { ApolloError } = require('apollo-server')

class RechargeService {
  async handle (args, context) {
    const verifyClient = await MongoRecharge.find({
      client: args.idClient
    })

    const currentDate = new Date()

    if (new Date(args.endDate) < currentDate) {
      throw new ApolloError('The date cannot be less than current date', 'INVALID DATE')
    }

    if (!context.token) {
      throw new ApolloError('You are not authenticated', 'ALERT')
    }
    RechargeUtils.changeWhenRechargeOver()
    if (verifyClient.length) {
      throw new ApolloError('You can only have one recharge in progress!', 'MY_ERROR_CODE')
    }
    const verifyPlanet = await MongoRecharge.find({
      rechargePlace: args.idPlanet
    })

    if (verifyPlanet.length) {
      throw new ApolloError('Sorry, this station is busy!', 'MY_ERROR_CODE')
    }

    const insertQuery = await MongoRecharge.create({
      isBusy: true,
      client: args.idClient,
      rechargePlace: args.idPlanet,
      endDate: args.endDate
    })

    await insertQuery.save()

    return insertQuery
  }
}

module.exports = new RechargeService()
