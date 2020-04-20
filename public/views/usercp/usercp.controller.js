function userControlPanelController($scope, user, countries, userService){
    
    var vm = this;

    vm.user = user;
    vm.countries = countries;

    console.log(user);

    vm.toggleForm = function(){
        $scope.$broadcast('toggleForm');
    }

    vm.refreshUserData = function(){
        userService.getUserData()
        .then(function(data){
            vm.user = data;
        })
    };
}

angular.module('app').controller('userControlPanelController', userControlPanelController);