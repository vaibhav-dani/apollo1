
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
    console.log(response.headers);
  
    return this.articleReducer(response.data);
}

articleReducer(article) {
 return {
    id: article.id,
    title: article.attributes.title,
    body: article.attributes.body
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