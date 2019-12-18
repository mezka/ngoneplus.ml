function checkoutController(checkoutService, cartid, $state){

  var checkout = this;
  checkout.info.cartid = cartid;

  checkout.charge = function(){

    checkoutService.charge(checkout.info).then(function(data){
      console.log(data);
      $state.go('order', {stripeObj: data});
    });
  };
}


angular.module('app').controller('checkoutController', checkoutController);
