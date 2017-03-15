App.directive('storeElement', function(){
  return{
    restrict: 'AE',
    replace: true,
    scope: {
      productId: '@',
      productImage: '@',
      productName: '@',
      productPrice: '@'
    },
    templateUrl: './views/store/directives/storeElement.html'
  };
});
