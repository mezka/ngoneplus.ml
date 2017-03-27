var app = angular.module('app', ['ui.router']);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);


app.config(function($stateProvider, $urlRouterProvider) {

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: './views/home.html',
        authenticate: false
    };

    var storeState = {
        name: 'store',
        url: '/store',
        templateUrl: './views/store.html',
        controller: 'storeController as store',
        authenticate: false,
        resolve: {
            storeElements: function(storeService) {
                return storeService.getStoreElements();
            }
        }
    };

    var productState = {
        name: 'product',
        url: '/product/{productid}',
        templateUrl: '../views/product.html',
        controller: 'productController as product',
        resolve: {
            options: function(storeService, $transition$) {
                return storeService.getProductById($transition$.params().productid);
            },
        }
    };

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: './views/login.html',
      controller: 'loginController as login',
    };

    var signupState = {
      name: 'signup',
      url: '/signup',
      templateUrl: './views/signup.html',
      controller: 'signupController as signup',
    };

    var cartState = {
      name: 'cart',
      url: '/cart',
      templateUrl: './views/cart.html',
      controller: 'cartController',
      resolve:{
        items: function(cartService){
          return cartService.getCart();
        }
      }
    };

    var checkoutState = {
      name: 'checkout',
      url: '/checkout',
      templateUrl: './views/checkout.html',
      controller: 'paymentController as payment',
      resolve:{
        cartid: function(cartService){
          cartService.checkoutCart();
        }
      }
    };

    var summaryState = {
      name: 'summary',
      url: '/summary',
      templateUrl: './views/summary.html',
      controller: 'summaryController as summary',
      params: {
        stripeObj: null
      }
    };


    $stateProvider.state(homeState);
    $stateProvider.state(storeState);
    $stateProvider.state(productState);
    $stateProvider.state(loginState);
    $stateProvider.state(signupState);
    $stateProvider.state(cartState);
    $stateProvider.state(checkoutState);
    $stateProvider.state(summaryState);


    $urlRouterProvider.otherwise('/');
});
