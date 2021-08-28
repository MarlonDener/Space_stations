const { ApolloServer } = require('apollo-server')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/schema')
const resolvers = require('./resolvers')
const GetDataNasa = require('./api/RestDataSource')
const authenticationAssurance = require('./middlewares/AuthenticationAssurance')

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB is running')
}).catch((err) => {
  console.log(`Error: ${err}`)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  authChecker: authenticationAssurance,
  context: ({ req }) => {
    const context = {
      req,
      token: req?.headers?.authorization
    }
    return context
  },
  dataSources: () => ({
    getDataNasa: GetDataNasa
  })
})

server.listen().then((url) => console.log(`Server started at ${url}`))
