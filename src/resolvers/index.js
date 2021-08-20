const AddPlanet = require('../models/PlanetStation')
const MongoUser = require('../models/User')
const MongoRecharge = require('../models/Recharge')
const AuthenticateUserService = require('../services/AuthenticateUserService')
const CreateUserService = require('../services/CreateUserService')
const RechargeService = require('../services/RechargeService')
const InstallStationService = require('../services/InstallStationService')

const RechargeUtils = require('../utils/RechargeData')

const resolvers = {
  Query: {
    suitablePlanets: async (_, __, { dataSources }) => {
      const data = await dataSources.getDataNasa.getSuitablePlanets()
      return data
    },
    stations: async () => {
      const allStations = await AddPlanet.find({ installedStations: { $exists: true, $not: { $size: 0 } } })
      return allStations
    },
    getAllUsers: async () => {
      const users = await MongoUser.find().select(['_id', 'name', 'email'])
      return users
    },
    stationHistory: async () => {
      RechargeUtils.changeWhenRechargeOver()

      const allHistory = await MongoRecharge.find().populate('client')
      const dataAboutRecharge = RechargeUtils.RechargeData(allHistory)
      return dataAboutRecharge
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
    }
  }
}

module.exports = resolvers
