function receiptController(receiptData){
  const vm = this;
  vm.data = receiptData;
}

angular.module('app').controller('receiptController', receiptController);
