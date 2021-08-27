const { RESTDataSource } = require('apollo-datasource-rest')
// AddPlanet nesse caso não ficou muito muito claro porque traz a ideia de ser uma ação, uma função
// acho que chamar de "PlanetStation" ou simplesmente "Planet" deixaria melhor
const AddPlanet = require('../models/PlanetStation')

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

    // particularmente eu prefiro usar um .map quando a ideia é
    // pegar os itens de um array e fazer algum tipo de transformação
    const planets = 
      JSON.parse(data).map(planet => ({
        name: planet.pl_name,
        mass: planet.pl_bmassj
      }));

    const suitablePlanets = planets.filter(
      planet => planet.mass && planet.name && planet.mass > 10
    );

    // não entendi exatamente o porque foi escolhido esse planeta para verificar 
    // se os planetas deveriam ser inseridos no banco
    // uma outra forma de fazer isso seria

    const planetsExists = await AddPlanet.exists();
    if (planetsExists)
      return AddPlanet.find();

    return AddPlanet.insertMany(suitablePlanets);
  }
}
module.exports = new GetDataNasa()
