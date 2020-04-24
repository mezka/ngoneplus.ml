var SweetAlert = angular.module('SweetAlert', []);

SweetAlert.factory('Swal', function(){
  return window.Swal;
})

var app = angular.module('app', ['ui.router', 'ngAnimate', 'templates', 'SweetAlert', 'ngFlash']);

app.config(function($stateProvider, $urlRouterProvider) {

    var homeState = {
        url: '/',
        name: 'home',
        templateUrl: '/views/home/home.html',
        authenticate: false
    };

    var storeState = {
        name: 'store',
        url: '/store',
        templateUrl: '/views/store/store.html',
        controller: 'storeController as store',
        resolve: {
          storeItems: function(storeService) {
                return storeService.getStoreItems();
            }
        }
    };

    var productState = {
        name: 'product',
        url: '/product/{productid}',
        templateUrl: '/views/product/product.html',
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
      templateUrl: '/views/login/login.html',
      controller: 'loginController as login',
    };

    var signupState = {
      name: 'signup',
      url: '/signup',
      templateUrl: '/views/signup/signup.html',
      controller: 'signupController as signup',
    };

    var cartState = {
      name: 'cart',
      url: '/cart',
      templateUrl: '/views/cart/cart.html',
      controller: 'cartController as cart',
      resolve:{
        items: function(cartService){
          return cartService.getCart();
        },
        addresses: function(userService){
          
          var addressParse = function(addressObj){
            var out = addressObj.address1;

            if(addressObj.address2){
              out += ', ' + addressObj.address2;
            }
            if(addressObj.city){
              out += ', ' + addressObj.city;
            }
            if(addressObj.state){
              out += ', ' + addressObj.state;
            }
            out += ', ' + addressObj.country;

            return {id: addressObj.id, name: out};
          }

          return userService.getAddressList()
          .then(function(data){
            return data.map(addressParse);
          })
          .catch(function(result){
            return null;
          })
        },
      }
    };

    var orderState = {
      name: 'orders',
      url: '/orders',
      templateUrl: '/views/orders/orders.html',
      data: { requiresAuth: true },
      controller: 'ordersController as orders',
      resolve: {
        pendingorders: function(orderService){
          return orderService.getPendingOrders();
        }
      }
    };

    var paymentState = {
      name: 'payment',
      url: '/order/{orderid}/payment',
      templateUrl: '/views/payment/payment.html',
      data: { requiresAuth: true },
      params: { orderid: null},
      controller: 'paymentController as payment',
    };

    var userControlPanelState = {
      name: 'userControlPanel',
      url: '/user/cp',
      templateUrl: '/views/usercp/usercp.html',
      controller: 'userControlPanelController as userCP',
      data: { requiresAuth: true },
      resolve: {
        user: function(userService){
          return userService.getUserData();
        },
        countries: function(locationService){
          return locationService.getCountries();
        }
      }
    };


    $stateProvider.state(homeState);
    $stateProvider.state(storeState);
    $stateProvider.state(productState);
    $stateProvider.state(loginState);
    $stateProvider.state(signupState);
    $stateProvider.state(cartState);
    $stateProvider.state(orderState);
    $stateProvider.state(paymentState);
    $stateProvider.state(userControlPanelState);
    
    
    $urlRouterProvider.otherwise('/');
  });
  
  authHookRunBlock.$inject = ['$transitions', 'authService'];

  function authHookRunBlock(transitionService, authService) {

    // Matches if the destination state's data property has a truthy 'data.requiresAuth' property
    var requiresAuthCriteria = {
      to: function(state){
        return state.data && state.data.requiresAuth;
      }
    };
      
    function redirectToLogin(transition){

      var authService = transition.injector().get('authService');
      var $state = transition.router.stateService;

      authService.isAuthenticated()
      .catch(function(){
        return $state.go('login', undefined, { location: false });
      });
    }

    // Register the "requires auth" hook with the TransitionsService
    transitionService.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
  }

app.run(authHookRunBlock);


//needed for Batarang support
angular.element(document).ready(() => {
    maybeBootstrap();
});