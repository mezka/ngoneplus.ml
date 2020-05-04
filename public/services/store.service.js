function storeService($http) {

    this.getStoreItems = function() {

        return $http({
            method: 'GET',
            url: '/api/store'
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error.data;
        });

    };

    this.getProductById = function(productid) {
        return $http({
            method: 'GET',
            url: '/api/product/' + productid
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return error.data;
        });
    };

}

angular.module('app').service('storeService', storeService);
