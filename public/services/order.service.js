function orderService($http, parseAddressObjToString) {

    this.getOrders = function(){
        return $http({
            method: 'GET',
            url:'/api/orders'
        }).then(function(response){
            return response.data.map(function(order){
                order.address = parseAddressObjToString(order);

                delete order.address1;
                delete order.address2;
                delete order.city;
                delete order.state;
                delete order.country;
                delete order.zipcode;

                order.orderprice = order.orderitems.reduce(
                function (acum, element) {
                    return acum + element.quantity * element.optionprice * (100 - element.discount) / 100;
                }, 0);

                return order;
            })
            
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