module.exports = {
  Query: {
    articles: async (_, __, { dataSources }) =>
      dataSources.contentAPI.getAllArticles(),
    article: (_, { id }, { dataSources }) =>
      dataSources.contentAPI.getArticleById({ articleId: id }),
      images: async (_, __, { dataSources }) =>
      dataSources.damAPI.getAllImages(),
    image: (_, { id }, { dataSources }) =>
      dataSources.damAPI.getImageById({ imageId: id }),
      searchImages: async (_, {text}, { dataSources }) =>
      dataSources.damAPI.getAllImagesByExpression(text)
  },
};