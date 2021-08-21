const MongoRecharge = require('../models/Recharge')
const RechargeUtils = require('../utils/RechargeData')
const MongoPlanets = require('../models/PlanetStation')
const { ApolloError } = require('apollo-server')

class RechargeService {
  async handle (args, context) {
    const verifyClient = await MongoRecharge.find({
      client: args.idClient
    })

    if (!context.token) {
      throw new ApolloError('You are not authenticated', 'ALERT')
    }
    const verifyHasStation = await MongoPlanets.findById(args.idPlanet)

    if (!verifyHasStation.hasStation) {
      throw new ApolloError('Sorry, there is no station on this planet!', 'MY_ERROR_CODE')
    }

    const currentDate = new Date()

    if (new Date(args.endDate) < currentDate) {
      throw new ApolloError('The date cannot be less than current date', 'INVALID DATE')
    }
    const verifyPlanet = await MongoRecharge.find({
      rechargePlace: args.idPlanet
    })

    RechargeUtils.changeWhenRechargeOver()
    if (verifyPlanet.length) {
      verifyPlanet.forEach((element, index) => {
        if (verifyPlanet[index].isActiveRecharge) {
          throw new ApolloError('Sorry, this station is busy!', 'MY_ERROR_CODE')
        }
      })
    }

    if (verifyClient.length) {
      verifyClient.forEach((element, index) => {
        if (verifyClient[index].isActiveRecharge) {
          throw new ApolloError('You can only have one recharge in progress!', 'ALREADY RECHARGE')
        }
      })
    }

    const insertQuery = await MongoRecharge.create({
      client: args.idClient,
      rechargePlace: args.idPlanet,
      endDate: args.endDate
    })

    await insertQuery.save()

    return insertQuery
  }
}

module.exports = new RechargeService()
