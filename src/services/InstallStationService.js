const AddPlanet = require('../models/PlanetStation')
const { ApolloError } = require('apollo-server')

class InstallStationService {
  async handle (args) {
    const planet = await AddPlanet.findById(args.idPlanet)
    if (!planet) {
      throw new ApolloError('This planet does not exist', 'Planet not found')
    }

    if (planet.installedStations.includes(args.nameStation)) {
      throw new ApolloError('Station already exist in this planet', 'Station already exist')
    }

    await planet.updateOne({ $push: { installedStations: args.nameStation }, hasStation: true })
    return planet
  }
}

module.exports = new InstallStationService()
