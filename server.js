
const { ApolloServer, gql } = require("apollo-server")
const { buildFederatedSchema } = require("@apollo/federation")

const typeDefs = gql`

  extend type Query {
    topProducts(first: Int = 5): [Product]
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String!
    price: Int
  }
`

const resolvers = {
  Query: {
    topProducts: () => []
  }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([
    { typeDefs, resolvers }
  ])
})

server.listen({
  port: process.env.PORT || 3000
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})