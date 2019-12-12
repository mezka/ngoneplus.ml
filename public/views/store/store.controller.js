function storeController(storeItems, $scope){
  this.items = storeItems;
}


angular.module('app').controller('storeController', storeController);
