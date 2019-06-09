const { RESTDataSource } = require('apollo-datasource-rest');

class HeaderAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://childrensplacestg.prod.acquia-sites.com/api/content/navigation'; 
  }

async getHeader() {
  const response = await this.get('header/7518a373-1117-4199-a2bf-297108f6064e');
    console.log(response);
    return this.headerReducer(response.data) ;    
}

imageReducer(image){
console.log("\n----inside image-----\n "+JSON.stringify(image));    
    return{
      url: image.val.url,
      title: image.val.title,
      alt:image.val.alt
    };
    
}    

    
headerReducer(header) {
console.log("inside header"+header.data);
return {
    id: header.cid,
    subType: header.sub,
    topHeader : this.topHeaderReducer(header.val[0]),
    promotionalBanners : [this.promoBannerReducer(header.val[1].val[0]),this.promoBannerReducer(header.val[1].val[1]),this.promoBannerReducer(header.val[1].val[2])]
  };
}


topHeaderReducer(subMo){
console.log("inside subMo"+subMo);
return {
    id: subMo.cid,
    subType: subMo.sub,
    brandTabs: [this.brandTabReducer(subMo.val[0])],
    promoMessages : [this.textAndLinkReducer(subMo.val[1].val[0]),this.textAndLinkReducer(subMo.val[1].val[1]),this.textAndLinkReducer(subMo.val[1].val[2])]
  };
}  

    
brandTabReducer(compo){
console.log("inside brandtab"+compo);
return {
    id: compo.cid,
    subType: compo.sub,
    brandLinks: [this.linkReducer(compo.val[0]),this.linkReducer(compo.val[1])]
    //brandLinks: [(compo.val).forEach(this.linkReducer)]
  };
}

promoBannerReducer(textLink){
console.log("\n----inside promoBannerReducer-----\n "+JSON.stringify(textLink));    
return {
    textLines: [this.textReducer(textLink.val[1].val[0]),this.textReducer(textLink.val[1].val[1])], 
    link: this.linkReducer(textLink.val[0])
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
module.exports = HeaderAPI;