function storeService($http) {

    this.getStoreItems = function() {

        return $http({
            method: 'GET',
            url: '/api/store'
        }).then(function(response) {
            if (response.status === 200) {
                console.log('/api/store');

                console.log(response.data);

                return response.data;
            } else
                console.log('Get store items failed, logging response.status: ', response.status);
        });

    };

    this.getProductById = function(productid) {
        return $http({
            method: 'GET',
            url: '/api/product/' + productid
        }).then(function(response) {
            if (response.status === 200) {
                console.log('/api/product/*');
                return response.data;
            } else
                console.log('Get store elements failed, logging response.status: ', response.status);
        });
    };

}

angular.module('app').service('storeService', storeService);
