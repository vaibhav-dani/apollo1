const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {

  header : Header!
  moduleD(id: String): ModuleD

}

type ModuleD @cacheControl(maxAge: 30) {
id : String
subType : String
moduleTitle : HeaderTitleComposite
promoBanner : CarouselItem
carousel : [CarouselItem]
ctaButton : Link
}


type HeaderTitleComposite{
headerText : Text
headerLink : Link
}

type Header  @cacheControl(maxAge: 30) {

id : String
subType : String
topHeader : TopHeader
promotionalBanners : [PromoBanner]
}

type TopHeader {
id : String
subType : String
brandTabs : [BrandTab]
promoMessages : [TextAndLink]

}

type BrandTab {
    id : String
    subType : String
    brandLinks : [Link]
}


type PromoBanner{
    link : Link
    textLines : [Text]    
}

type CarouselItem{
image : Image
link : Link
}


type TextAndLink {
    text : Text
    link : Link
}

type Link {
    subType: String
    url: String
    title: String
    target: String
    external: String
    class: String
}

type Text {
    subType : String
    text : String
    color : String
    style : String
}

type Image {
    url : String
    title : String
    alt : String
}`

module.exports = typeDefs;