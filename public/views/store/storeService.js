function storeService($http){
  this.getStoreElements = function(){

    return $http({
      method: 'GET',
      url: '/api/products/'
    }).then(function(response){
      if(response.status === 200)
        return response.data;
      else
        console.log('Get store elements failed, logging response.status: ', response.status);
    });

  };


}


App.service('storeService', storeService);
