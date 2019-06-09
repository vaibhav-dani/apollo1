const { ApolloServer, gql } = require('apollo-server');
const { MemcachedCache } = require('apollo-server-cache-memcached');
const { RedisCache } = require('apollo-server-cache-redis');
const { ResponseCachePlugin } = require('apollo-server-plugin-response-cache');


const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const HeaderAPI = require('./datasources/content');
//const ModulesAPI = require('./datasources/modules');
const ModulesAPI = require('./datasources/modules');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    headerAPI: new HeaderAPI(),
    modulesAPI: new ModulesAPI()
  }),
  //plugins: [ResponseCachePlugin]

});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});