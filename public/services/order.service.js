function orderService($http) {

    this.getPendingOrders = function(){
        return $http({
            method: 'GET',
            url:'/api/orders/pending'
        }).then(function(response){
            if(response.status === 200){
                return response.data;
            }
        }).catch(function(error){
            console.log(error);
        });
    };

    this.payForOrder = function(orderid){
        return $http({
            method: 'POST',
            url:'/api/orders/pending'
        }).then(function(response){
            if(response.status === 200){
                return response.data;
            }
        }).catch(function(error){
            console.log(error);
        });
    }
}

angular.module('app').service('orderService', orderService);