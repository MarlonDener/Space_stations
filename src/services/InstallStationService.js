const AddPlanet = require('../models/PlanetStation')
const { ApolloError } = require('apollo-server')

class InstallStationService {
  async handle (args) {
    // planet fica mais legível na minha opinião
    const planet = await AddPlanet.findById(args.idPlanet)
    if (!planet) {
      throw new ApolloError('This planet does not exist', 'MY_ERROR_CODE')
    }
    
    if (planet.installedStations.includes(args.nameStation)) {
      throw new ApolloError('Station already exist in this planet', 'MY_ERROR_CODE')
    } 

    await planet.updateOne({ $push: { installedStations: args.nameStation }, hasStation: true });
    return planet;
  }
}

module.exports = new InstallStationService()
