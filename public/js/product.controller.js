function productController(options, cartService, $stateParams){

  this.options = options;
  this.current = options[0];

  this.current.currentimage = this.current.imageurls[0];

  this.changeCurrentImage = function(imageUrl){
    this.current.currentimage = imageUrl;
  };

  this.changeCurrentOption = function(option){
    this.current = option;
  }

  this.addCurrentOptionToCart = function(){
    cartService.addProductToCart(Number($stateParams.productid), Number(this.current.optionid), this.current.productname, this.current.optionname, this.current.imageurls[0], Number(this.current.optionprice), 1, Number(this.current.discount))
    .then(function(data){
      console.log(data);
    });
  };
}


angular.module('app').controller('productController', productController);
