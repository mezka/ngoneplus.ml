var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    var homeState = {
        name: 'home',
        url: '/',
        component: 'home'
    };

    var storeState = {
        name: 'store',
        url: '/store',
        component: 'store',
        resolve: {
            storeElements: function(storeService) {
                return storeService.getStoreElements();
            }
        }
    };

    var productState = {
      name: 'product',
      url: '/product/{productid}',
      component: 'product',
    };



    $stateProvider.state(homeState);
    $stateProvider.state(storeState);
    $stateProvider.state(productState);

    $urlRouterProvider.otherwise('/');
});
