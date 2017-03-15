function storeController($scope, storeService){

  console.log('Loading storeController');

  storeService.getStoreElements().then(function(data){
    $scope.storeElements = data;
  });
}

App.controller('storeController', storeController);
