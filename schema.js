const { gql } = require('apollo-server');

const typeDefs = gql`


type Query {
  articles : [Article]!
  article(id: String): Article
  images : [Image]!
  searchImages(text: String) : [Image]
  image(id: String): Image
}

type Article{
id: String
title: String
body: String
}

type Image{
id: String
filename: String
format : String
url : String
}

`

module.exports = typeDefs;