const { RESTDataSource } = require('apollo-datasource-rest');

class ModulesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseNodeURL = 'http://childrensplacestg.prod.acquia-sites.com/api';          
  }

async getModuleD({ moduleId }) {    
  this.baseURL = this.baseNodeURL+'/module/'+moduleId;
  const response = await this.get('/');
  return this.moduleD(response.data);
}

moduleD(module){
return {
    id: module.cid,
    subType: module.sub,
    moduleTitle: this.headerTitleCompositeReducer(module.val[0]),
    promoBanner: this.carouselItemReducer(module.val[1].val[0]),
    carousel : [this.carouselItemReducer(module.val[2].val[0]),this.carouselItemReducer(module.val[2].val[1])],    
    ctaButton: this.linkReducer(module.val[3].val)
    
  };    
}
carouselItemReducer(item){
console.log("\n----inside carouselItemReducer\n"+JSON.stringify(item));    
    return{
        image: this.imageReducer(item.val[0]),
        link: this.linkReducer(item.val[1])
    };
}
    
imageReducer(image){
console.log("\n----inside image-----\n "+JSON.stringify(image));    
    return{
      url: image.val.url,
      title: image.val.title,
      alt:image.val.alt
    };
    
}
    
    
    
headerTitleCompositeReducer(headerText){
return {
    headerText: this.textReducer(headerText.val[0].val[0]), 
    headerLink: this.linkReducer(headerText.val[1])  
  };    
}    
    
    
textAndLinkReducer(textLink){
return {
    text: this.textReducer(textLink.val[0]), 
    link: this.linkReducer(textLink.val[1])  
  };
    
}

linkReducer(link){
    console.log("\n----inside link-----\n "+JSON.stringify(link));    
    return{
        subType : link.sub,
        url: link.val.url,
        title: link.val.title,
        target: link.val.target,
        external: link.val.external,
        class: link.val.class
    }
}
    
textReducer(text){
    console.log("\n----inside text-----\n "+JSON.stringify(text));    
    return{
        subType : text.sub,
        text : text.val.text,
        color : text.val.color,
        style : text.val.style
    }
}    
    
 parseBody(response) {
    if (response.headers.get('Content-Type').includes('json')) {
      return response.json();
    } else {
      return response.text();
    }
  }    

}
module.exports = ModulesAPI;