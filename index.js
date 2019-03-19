const { ApolloServer, gql } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ContentAPI = require('./datasources/content');
const DamAPI = require('./datasources/dam');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
    dataSources: () => ({
    contentAPI: new ContentAPI(),
    damAPI: new DamAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});