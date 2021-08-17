const AddPlanet = require('../database/PlanetStation')
const { ApolloError } = require('apollo-server')
const MongoUser = require('../database/User')
const MongoRecharge = require('../database/Recharge')
const { hash, genSalt, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const AuthConfig = require('../config/auth')

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
    }
  },
  Mutation: {
    installStation: async (_, args) => {
      const query = await AddPlanet.findById(args.id)
      if (!query) {
        throw new ApolloError('This planet does not exist', 'MY_ERROR_CODE')
      }
      if (!query.installedStations.includes(args.installedStations)) {
        await query.updateOne({ $push: { installedStations: args.installedStations }, hasStation: true })
      } else {
        throw new ApolloError('Station already exist in this planet', 'MY_ERROR_CODE')
      }
      return query
    },
    createUser: async (_, args) => {
      const salt = await genSalt(8)
      const hashedPassword = await hash(args.password, salt)
      const { name, email } = args
      const user = await MongoUser.create({ name: name, email: email, password: hashedPassword })
      return await user
    },
    signIn: async (_, args) => {
      const user = await MongoUser.findOne({
        email: args.email
      })

      if (!user) {
        throw new Error('Incorrect email/password')
      }

      const passwordMatched = await compare(args.password, user.password)

      if (!passwordMatched) {
        throw new Error('Incorrect email/password')
      }

      const token = sign({
        email: user.email
      }, AuthConfig.jwt.secret, {
        subject: `"${user._id}"`,
        expiresIn: AuthConfig.jwt.expiresIn
      })

      return { token, user }
    },
    recharge: async (_, args, context, __) => {
      const verifyClient = await MongoRecharge.find({
        client: args.idClient
      })
      if (!context.token) {
        throw new ApolloError('You are not authenticated', 'ALERT')
      }
      const dataActual = new Date()
      await MongoRecharge.deleteMany({ endDate: { $lte: dataActual } })
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
}

module.exports = resolvers
