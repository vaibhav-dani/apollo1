const { RESTDataSource } = require('apollo-datasource-rest');

class DamAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.cloudinary.com/v1_1/dknjfdfyy/resources';
  }

willSendRequest(request) {
    request.headers.set('Authorization', "Basic OTcxMzMyNDg3NjQ1NjI1Om5QcEU0TGlFQ3N6Z2JxQ2QyMFVoTko4Mlp6SQ==");
  }    
    
async getAllImages() {
  //this.baseURL = this.baseURL+'/search/';
   const response = await this.get('search');
    console.log(response.resources);
  return Array.isArray(response.resources)
    ? response.resources.map(image => this.imageReducer(image))
    : [];
}

async getAllImagesByExpression(expression) {
  this.baseURL = this.baseURL+'/search?expression='+expression;    
   const response = await this.get('/');
     return Array.isArray(response.resources)
    ? response.resources.map(image => this.imageReducer(image))
    : [];
} 
    
    
async getImageById({ imageId }) {
  this.baseURL = this.baseURL+'/image/'+imageId;
  const response = await this.get('/');
  return this.imageReducer(response.data);
}

imageReducer(image) {
    return {
    id: image.public_id,
    filename: image.filename,
    format : image.format,
    url : image.url    
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
module.exports = DamAPI;