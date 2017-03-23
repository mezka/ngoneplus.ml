function productController(options, cartService, $stateParams){
  options.forEach(firstImageIsCurrentImage);
  this.options = options;
  this.currentOption = options[0];

  this.changeCurrentImage = function(imageUrl){
    this.currentOption.currentimage = imageUrl;
  };

  productid = $stateParams.productid;



  this.addProductToCart = function(optionid, productname, optionname, imageurl, optionprice, quantity, discount){
    console.log(productid, optionid, productname, optionname, imageurl, optionprice, quantity, discount);
    cartService.addProductToCart(Number(productid), Number(optionid), productname, optionname, imageurl, Number(optionprice), Number(quantity), Number(discount)).then(function(data){
      console.log(data);
    });
  };

}

function firstImageIsCurrentImage(obj){
  obj.currentimage = obj.imageurls[0];
  obj.radioclass = "{background: url(" + obj.optionimageicon + ") " + obj.optionimagecolor + '}';
  console.log(obj.radioclass);
}

angular.module('app').controller('productController', productController);
