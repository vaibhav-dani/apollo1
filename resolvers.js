module.exports = {
  Query: {
    articles: async (_, __, { dataSources }) =>
      dataSources.contentAPI.getAllArticles(),
    article: (_, { id }, { dataSources }) =>
      dataSources.contentAPI.getArticleById({ articleId: id })
  },
};