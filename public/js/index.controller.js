function IndexController($scope, $state) {
    $scope.show = false;

    $scope.dropdownHandler = function(){
        $scope.show = !$scope.show;
    }
}

app.controller('IndexController', IndexController);