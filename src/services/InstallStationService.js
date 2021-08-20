const AddPlanet = require('../models/PlanetStation')
const { ApolloError } = require('apollo-server')

class InstallStationService {
  async handle (args) {
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
  }
}

module.exports = new InstallStationService()
