const { gql } = require('apollo-server')

const typeDefs = gql`

    type User {
        name: String
        email: String
    }
     type Planet {
        name: String
        mass: Float
        hasStation: Boolean
    }

    type install {
        name: String
        mass: Float
        _id: String
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

    type allUsers {
        _id: String
        email: String
        name: String
    }
    type stationHistoryType {
        _id: String
        client: User
        finalDate: String
        started_in: String
        duration: String
        isActiveRecharge: Boolean
    }
  
    type Query {
        suitablePlanets: [Planet]
        stations: [allStations]!
        getAllUsers: [allUsers]!
        stationHistory(idPlanet: String): [stationHistoryType]
    }
    type Mutation {
        installStation(id: String, installedStations: String): install!  
        createUser(name: String, email: String, password: String): User!
        signIn(email: String, password: String): Login!
        recharge(idClient: String, idPlanet: String, endDate: String): rechargeType!
        
    }

`

module.exports = typeDefs
