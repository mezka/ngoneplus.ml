function storeService($http){
  this.getStoreElements = function(){

    return $http({
      method: 'GET',
      url: '/api/store/'
    }).then(function(response){
      if(response.status === 200)
        return response.data;
      else
        console.log('Get store elements failed, logging response.status: ', response.status);
    });

  };

  this.getProductById= function(){
    console.log('todo');
  };


}


App.service('storeService', storeService);
