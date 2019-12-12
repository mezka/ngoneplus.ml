
angular.module('app').directive('cartElement', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './directives/cart-element.html',
  }
})

// angular.module('app').directive('cartElement', function(){

//   return{
//     restrict: 'AE',
//     replace: false,
//     templateUrl: './directives/cartElement.html',
//     link: function(scope){
//       scope.$watch('item.quantity', function(){

//         console.log('watched');

//         scope.$parent.total = scope.$parent.calculateTotal(scope.items);
//       });
//     }
//   };
// });
