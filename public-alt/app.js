var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: './views/home.html'
    };

    var storeState = {
        name: 'store',
        url: '/store',
        templateUrl: './views/store.html',
        controller: 'storeController as store',
        resolve: {
            storeElements: function(storeService) {
                return storeService.getStoreElements();
            }
        }
    };

    var productState = {
        name: 'product',
        url: '/product/{productid}',
        templateUrl: './views/product.html',
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
      templateUrl: './views/login.html'
    };

    var signupState = {
      name: 'signup',
      url: '/signup',
      templateUrl: './views/signup.html'
    };


    $stateProvider.state(homeState);
    $stateProvider.state(storeState);
    $stateProvider.state(productState);
    $stateProvider.state(loginState);
    $stateProvider.state(signupState);

    $urlRouterProvider.otherwise('/');
});
