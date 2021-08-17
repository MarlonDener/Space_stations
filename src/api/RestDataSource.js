const { RESTDataSource } = require('apollo-datasource-rest')
const AddPlanet = require('../database/PlanetStation')

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

    const readyData = JSON.parse(data)

    const planets = []
    readyData.forEach(planet =>
      planets.push({
        name: planet.pl_name,
        mass: planet.pl_bmassj
      })
    )
    const suitablePlanets = planets.filter(
      planet => planet.mass && planet.name && planet.mass > 10
    )

    const verify = await AddPlanet.findOne({
      name: 'KELT-1 b'
    })
    if (verify) {
      const getPlanets = AddPlanet.find()
      console.log(getPlanets)
      return getPlanets
    } else {
      AddPlanet.insertMany(suitablePlanets)
    }
    return suitablePlanets
  }
}
module.exports = new GetDataNasa()
