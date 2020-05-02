angular.module('app')
    .directive('cartItemQtySelector', function () {
    return {
        restrict: 'E',
        scope: {
            item: '=',
        },
        template:`
                    <button class="btn-square" ng-click="subtractOne()">-</button>
                    <input ng-model="item.quantity" type="number" min="1"></input>
                    <button class="btn-square" ng-click="addOne()">+</button>
                 `,
        controller: function($scope, cartService){
            $scope.addOne = function(){
                $scope.item.quantity++;
                cartService.updateCartItem($scope.item);
            };
            $scope.subtractOne = function(){
                if($scope.item.quantity > 1)
                    $scope.item.quantity--;
                cartService.updateCartItem($scope.item);
            };
        },
    }
});