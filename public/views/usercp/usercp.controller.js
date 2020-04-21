function userControlPanelController($scope, user, countries, userService, authService, $state){
    
    var vm = this;

    vm.user = user;
    vm.countries = countries;

    vm.toggleForm = function(){
        $scope.$broadcast('toggleForm');
    };

    vm.refreshUserData = function(){
        userService.getUserData()
        .then(function(data){
            vm.user = data;
        })
    };

    vm.logout = function(){
        authService.logout()
        .then(function(data){
            $state.go('login');
        })
    };
}

angular.module('app').controller('userControlPanelController', userControlPanelController);