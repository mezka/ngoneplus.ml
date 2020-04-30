function storeController(storeItems){
  this.items = storeItems;
}


angular.module('app').controller('storeController', storeController);
