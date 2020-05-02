
function cartService($http) {

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
                return response.data;
            }).catch(function(error) {
                console.log(error);
                return Promise.reject(error);
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
        deleteCartItem: function(optionid) {

            return $http({
                method: 'POST',
                url: '/api/cart/delete',
                data: { optionid }
            }).then(function(response) {
                if (response.status === 200) {
                    console.log(response.data);
                    return response.data;
                }
            }).catch(function(response) {
                console.log(response.status);
            });
        },

        updateCartItem: function(cartObj) {

            return $http({
                method: 'POST',
                url: '/api/cart/update',
                data: cartObj
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
