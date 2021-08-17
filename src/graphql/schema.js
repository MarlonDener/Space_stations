const { gql } = require('apollo-server')

const typeDefs = gql`

    type User {
        name: String
        email: String
    }
     type Planet {
        _id: String
        name: String
        mass: Float
        hasStation: Boolean
    }
    
    type allStations {
        name: String
        mass: Float
        installedStations: [String]
    }
    type Login {
        token: String
        user: User
    }
 
    type rechargeType {
        _id: String
        client: String
        rechargePlace: String
    }
  
    type Query {
        suitablePlanets: [Planet]
        stations: [allStations]!
    }
    type Mutation {
        installStation(id: String, installedStations: String): Planet!  
        createUser(name: String, email: String, password: String): User!
        signIn(email: String, password: String): Login!
        recharge(idClient: String, idPlanet: String, endDate: String): rechargeType!
    }

`

module.exports = typeDefs
