const { RESTDataSource } = require('apollo-datasource-rest')
const PlanetStation = require('../models/PlanetStation')

class GetDataNasa extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI'

    this.initialize({})
  }

  async getSuitablePlanets () {
    const response = await this.get('/', {
      table: 'exoplanets',
      format: 'json'
    })

    const divider = response.search(/\[/)
    const data = response.slice(divider)

    const planets =
      JSON.parse(data).map(planet => ({
        name: planet.pl_name,
        mass: planet.pl_bmassj
      }))

    const suitablePlanets = planets.filter(
      planet => planet.mass && planet.name && planet.mass > 10
    )

    const planetsExists = await PlanetStation.exists()
    if (planetsExists) { return PlanetStation.find() }

    return PlanetStation.insertMany(suitablePlanets)
  }
}
module.exports = new GetDataNasa()
