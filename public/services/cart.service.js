
function cartService($http, $state) {

    return {
        addProductToCart: function(productid, optionid, productname, optionname, imageurl, optionprice, quantity, discount) {
            return $http({
                method: 'POST',
                url: '/api/cart',
                data: {
                    productid: productid,
                    optionid: optionid,
                    productname: productname,
                    optionname: optionname,
                    imageurl: imageurl,
                    optionprice: optionprice,
                    quantity: quantity,
                    discount: discount
                }
            }).then(function(response) {
                if (response.status === 200) {
                    return response.data;
                }
            }).catch(function(response) {
                console.log(response.status);
            });
        },
        getCart: function() {
            return $http({
                method: 'GET',
                url: '/api/cart'
            }).then(function(response) {
                if (response.status === 200) {
                    console.log(response.data);
                    return response.data;
                }
            }).catch(function(response) {
                console.log(response.status);
            });
        },
        checkoutCart: function(addressid) {
            return $http({
                method: 'POST',
                url: '/api/cart/checkout',
                data: {
                    addressid: addressid,
                }
            }).then(function(response) {
                if (response.status === 200) {
                    $state.go('orders');
                }
                return response.data;
            }).catch(function(error) {
                if(error.status === 401){
                    $state.go('login');
                }
                return error;
            });
        },
        clearCart: function() {

            return $http({
                method: 'POST',
                url: '/api/cart/clear'
            }).then(function(response) {
                if (response.status === 200) {
                    return response.data;
                }
            }).catch(function(response) {
                console.log(response.status);
            });
        },
        deleteCartItem: function(tempid) {

            return $http({
                method: 'POST',
                url: '/api/cart/delete',
                data: {
                    tempid: tempid,
                }
            }).then(function(response) {
                if (response.status === 200) {
                    console.log(response.data);
                    return response.data;
                }
            }).catch(function(response) {
                console.log(response.status);
            });
        }
    }
}


angular.module('app').service('cartService', cartService);
