function orderController($stateParams){
  this.stripeObj = $stateParams.stripeObj;
}

angular.module('app').controller('orderController', orderController);
