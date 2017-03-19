function productController(options){
  options.forEach(firstImageIsCurrentImage);
  this.options = options;
  this.currentOption = options[0];

  this.changeCurrentImage = function(imageUrl){
    this.currentOption.currentimage = imageUrl;
  };

}

function firstImageIsCurrentImage(obj){
  obj.currentimage = obj.imageurls[0];
  obj.radioclass = "{background: url(" + obj.optionimageicon + ") " + obj.optionimagecolor + '}';
  console.log(obj.radioclass);
}

angular.module('app').controller('productController', productController);
