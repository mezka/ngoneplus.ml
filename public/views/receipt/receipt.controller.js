function receiptController($state){
  
  var vm = this;
  vm.data = $state.params

  console.log($state.params);
}

angular.module('app').controller('receiptController', receiptController);
