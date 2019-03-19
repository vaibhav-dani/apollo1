const { gql } = require('apollo-server');

const typeDefs = gql`


type Query {
  articles : [Article]!
  article(id: String): Article
}

type Article{
id: String
title: String
body: String
}

`

module.exports = typeDefs;