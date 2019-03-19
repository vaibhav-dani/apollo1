const { RESTDataSource } = require('apollo-datasource-rest');

class ContentAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://vaibhavdanic5wwvstcsn.devcloud.acquia-sites.com/jsonapi/node';
  }

async getAllArticles() {
  const response = await this.get('article');
  return Array.isArray(response.data)
    ? response.data.map(article => this.articleReducer(article))
    : [];
}


async getArticleById({ articleId }) {
  this.baseURL = this.baseURL+'/article/'+articleId;
  const response = await this.get('/');
  return this.articleReducer(response.data);
}

articleReducer(article) {
    
return {
    id: article.id,
    title: article.attributes.title,
    body: article.attributes.body.processed    
  };
}
    
 parseBody(response) {
    if (response.headers.get('Content-Type').includes('json')) {
      return response.json();
    } else {
      return response.text();
    }
  }    

}
module.exports = ContentAPI;