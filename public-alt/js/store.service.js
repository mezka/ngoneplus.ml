function storeService($http){

  this.getStoreElements = function(){

    return $http({
      method: 'GET',
      url: '/api/store'
    }).then(function(response){
      if(response.status === 200){
        console.log('/api/store');
        return response.data;
      }else
        console.log('Get store elements failed, logging response.status: ', response.status);
    });

  };

  this.getProductById= function(productid){

    return $http({
      method: 'GET',
      url: '/api/products/' + productid
    }).then(function(response){
      if(response.status === 200){
        return response.data;
      }else
        console.log('Get store elements failed, logging response.status: ', response.status);
    });

  };
}

angular.module('app').service('storeService', storeService);
