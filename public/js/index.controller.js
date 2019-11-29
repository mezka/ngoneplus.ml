function IndexController($scope, $state) {
    $scope.show = true;

    $scope.dropdownHandler = function(){
        console.log('handle');
        $scope.show = !$scope.show;
    }
}

app.controller('IndexController', IndexController);