module.exports = {
  Query: {
    
      header: async (_, __, { dataSources }) =>
      dataSources.headerAPI.getHeader(),
      
      moduleD: (_, { id }, { dataSources }) =>
      dataSources.modulesAPI.getModuleD({ moduleId: id })
  },
};