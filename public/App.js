var App = angular.module('App', ['ui.router']);

App.config(function($stateProvider, $urlRouterProvider){


    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: './views/home/home.html'
    };

    var onePlus3TState = {
        name: '3t',
        url: '/oneplus3t',
        templateUrl: './views/3t/3t.html'
    };

    var onePlus3State = {
        name: '3',
        url: '/oneplus3',
        templateUrl: './views/3/3.html'
    };

    var storeState = {
        name: 'store',
        url: '/store',
        templateUrl: './views/store/store.html'
    };

    var supportState = {
        name: 'support',
        url: '/support',
        templateUrl: './views/support/support.html'
    };

    var communityState = {
        name: 'community',
        url: '/community',
        templateUrl: './views/community/community.html'
    };

    var cartState = {
        name: 'cart',
        url: '/cart',
        templateUrl: './views/cart/cart.html'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(onePlus3TState);
    $stateProvider.state(onePlus3State);
    $stateProvider.state(storeState);
    $stateProvider.state(communityState);
    $stateProvider.state(cartState);

    $urlRouterProvider.otherwise('/');

});
