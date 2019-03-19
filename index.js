const { ApolloServer, gql } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ContentAPI = require('./datasources/content');

const server = new ApolloServer({
  typeDefs,
  resolvers,
    dataSources: () => ({
    contentAPI: new ContentAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});