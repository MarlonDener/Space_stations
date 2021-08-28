const MongoPlanetStation = require('../models/PlanetStation')
const MongoUser = require('../models/User')
const MongoRecharge = require('../models/Recharge')
const AuthenticateUserService = require('../services/AuthenticateUserService')
const CreateUserService = require('../services/CreateUserService')
const RechargeService = require('../services/RechargeService')
const InstallStationService = require('../services/InstallStationService')
const ReservationService = require('../services/ReservationService')
const UseReservedRechargeService = require('../services/UseReservedRechargeService')
const StationHistoryService = require('../services/StationHistoryService')

const RechargeUtils = require('../utils/RechargeData')
const { ApolloError } = require('apollo-server')

const resolvers = {
  Query: {
    suitablePlanets: async (_, __, { dataSources }) => {
      const data = await dataSources.getDataNasa.getSuitablePlanets()
      return data
    },
    stations: async () => {
      const allStations = await MongoPlanetStation.find({ installedStations: { $exists: true, $not: { $size: 0 } } })
      return allStations
    },
    getAllUsers: async () => {
      const users = await MongoUser.find().select(['_id', 'name', 'email'])
      return users
    },
    stationHistory: async (_, args) => {
      await RechargeUtils.changeWhenRechargeOver()
      try {
        const allHistory = await MongoRecharge.find(
          { rechargePlace: args.idPlanet }
        ).populate('client')

        const dataAboutRecharge = StationHistoryService.handle(allHistory)

        return dataAboutRecharge
      } catch (err) {
        throw new ApolloError('planet does not exist, or does not have a station')
      }
    }
  },
  Mutation: {
    installStation: async (_, args) => {
      const createStation = InstallStationService.handle(args)

      return createStation
    },
    createUser: async (_, args) => {
      const createUser = CreateUserService.handle(args)

      return createUser
    },
    signIn: async (_, args) => {
      const login = AuthenticateUserService.handle(args)

      return login
    },
    recharge: async (_, args, context, __) => {
      const createReacharge = RechargeService.handle(args, context)

      return createReacharge
    },
    reservation: async (_, args, context) => {
      const createReservation = ReservationService.handle(args, context)

      return createReservation
    },
    useReservedRecharge: async (_, args, context) => {
      const reservation = UseReservedRechargeService.handle(args, context)

      return reservation
    }

  }
}

module.exports = resolvers
