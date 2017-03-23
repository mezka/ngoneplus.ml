function cartService($http, authService){
  this.addProductToCart = function(productid, optionid, productname, optionname, imageurl, optionprice, quantity, discount){
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
    }).then(function(response){
        if (response.status === 200){
            return response.data;
        }
    }).catch(function(response){
        console.log(response.status);
    });

  };

  this.getCart = function(){
    return $http({
        method: 'GET',
        url: '/api/cart'
    }).then(function(response){
        if (response.status === 200){
            console.log(response.data);
            return response.data;
        }
    }).catch(function(response){
        console.log(response.status);
    });
  };

  this.checkoutCart = function(){
    return $http({
        method: 'POST',
        url: '/api/cart/checkout'
    }).then(function(response){
        if (response.status === 200){
            return response.data;
        }
    }).catch(function(response){
        console.log(response.status);
    });
  };

  this.clearCart = function(){

    return $http({
        method: 'POST',
        url: '/api/cart/clear'
    }).then(function(response){
        if (response.status === 200){
            return response.data;
        }
    }).catch(function(response){
        console.log(response.status);
    });

  };
}


angular.module('app').service('cartService', cartService);
