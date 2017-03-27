function summaryController($stateParams){
  this.stripeObj = $stateParams.stripeObj;
}

angular.module('app').controller('summaryController', summaryController);
