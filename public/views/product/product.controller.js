function productController(options, cartService, $stateParams){

  const vm = this;

  vm.options = options;
  vm.current = options[0];

  vm.current.currentimage = vm.current.imageurls[0];

  vm.changeCurrentImage = (imageUrl) => {
    vm.current.currentimage = imageUrl;
  };

  vm.changeCurrentOption = (option) => {
    vm.current = option;
    vm.current.currentimage = option.imageurls[0];
  }

  vm.addCurrentOptionToCart = () => {
    cartService.addProductToCart(
      Number($stateParams.productid),
      vm.current.optionid,
      vm.current.productname,
      vm.current.optionname,
      vm.current.imageurls[0],
      vm.current.optionprice,
      1,
      vm.current.discount)
    .then(function(data){
      console.log(data);
    });
  };
}


angular.module('app').controller('productController', productController);
