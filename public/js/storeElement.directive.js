angular.module('app').directive('storeElement', function(){
  return{
    restrict: 'AE',
    replace: false,
    templateUrl: './directives/storeElement.html'
  };
});
