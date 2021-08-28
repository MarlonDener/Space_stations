const MongoRecharge = require('../models/Recharge')
const RechargeUtils = require('../utils/RechargeData')
const MongoPlanets = require('../models/PlanetStation')
const { ApolloError } = require('apollo-server')
const uniqid = require('uniqid')

class ReservationService {
  async handle (args, context) {
    const verifyClient = await MongoRecharge.find({
      client: args.idClient
    })

    const verifyHasStation = await MongoPlanets.findById(args.idPlanet)

    if (!verifyHasStation.hasStation) {
      throw new ApolloError('Sorry, there is no station on this planet!', 'MY_ERROR_CODE')
    }

    const verifyPlanet = await MongoRecharge.find({
      rechargePlace: args.idPlanet
    })

    RechargeUtils.changeWhenRechargeOver()
    if (verifyPlanet.length) {
      verifyPlanet.forEach((element, index) => {
        if (args.initalDate > verifyPlanet[index].initalDate && args.initalDate < verifyPlanet[index].endDate) {
          throw new ApolloError('Sorry, this station already reservation!', 'ALREADY RESERVATION')
        }
      })
    }

    if (verifyClient.length) {
      verifyClient.forEach((element, index) => {
        if (verifyClient[index].isActiveRecharge) {
          throw new ApolloError('You can only have one recharge in progress or reserved!', 'ALREADY RECHARGE')
        }
      })
    }

    const currentDate = new Date()

    if (new Date(args.endDate) < currentDate || new Date(args.initialDate) < currentDate) {
      throw new ApolloError('The date cannot be less than current date', 'INVALID DATE')
    }

    if (new Date(args.initialDate) > new Date(args.endDate)) {
      throw new ApolloError('Start date cannot be less than end date!', 'ALREADY RECHARGE')
    }

    const insertQuery = await MongoRecharge.create({
      client: args.idClient,
      rechargePlace: args.idPlanet,
      isActiveRecharge: false,
      initialDate: args.initialDate,
      endDate: args.endDate,
      reservationId: uniqid('reserved-')
    })

    await insertQuery.save()

    return insertQuery
  }
}

module.exports = new ReservationService()
