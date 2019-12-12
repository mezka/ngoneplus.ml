function cartController(items, $scope , cartService, $state) {

    $scope.items = items;
    $scope.total = calculateTotal($scope.items);
    $scope.calculateTotal = calculateTotal;

    $scope.quantity = [1,2,3,4,5];

    console.log('here');
    console.log(items);


    function calculateTotal(arr) {

        console.log('Logging array: ', arr);

        if (!arr || arr.length === 0)
            return 0;
        else if (arr.length === 1) {
            return (arr[0].optionprice * arr[0].quantity).toFixed(2);
        } else {
            return (arr.reduce(function(prevSum, currElement) {
                return prevSum + currElement.quantity * currElement.optionprice;
            }, 0)).toFixed(2);
        }

        // $scope.apply();
    }

    function createCallbackKeyEqualsValue(key, value){
      return function keyEqualsValue(element){
          return element[key] === value;
      };
    }


    $scope.$watch('items', function(){
      $scope.total = calculateTotal($scope.items);
    });

    $scope.deleteCartElement = function(tempid){
      console.log('clicked');
      cartService.deleteCartElement(tempid).then(function(data){
        var toDeleteIndex = $scope.items.findIndex(createCallbackKeyEqualsValue('tempid', tempid));

        if(toDeleteIndex !== -1){
          $scope.items.splice(toDeleteIndex, 1);
          $scope.total = calculateTotal($scope.items);
        }

      });
    };

    $scope.clearCart = function() {
        cartService.clearCart().then(function(data) {
            console.log(data);
        });

        $scope.items = [];

        $scope.calculateTotal();
    };

    $scope.checkoutCart = function(){
      $state.go('checkout');
    };

}

angular.module('app').controller('cartController', cartController);
