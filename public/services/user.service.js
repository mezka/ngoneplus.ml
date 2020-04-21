function userService($http){
    this.getAddressList = function(){
        return $http({
            method: 'GET',
            url: '/api/address',
        }).then(function(response) {
            return response.data;
        }).catch(function(response) {
            console.log(response);
        });
    };

    this.getUserData = function(){
        return $http({
            method: 'GET',
            url: '/api/user'
        }).then(function(response){
            return response.data;
        }).catch(function(response){
            console.log(response);
        })
    };

    this.addUserAddress = function(addressData){
        return $http({
            method: 'POST',
            url: '/api/address/add',
            data: addressData
        }).then(function(response){
            return response.data;
        }).catch(function(response){
            console.log(response);
        })
    },

    this.deleteUserAddress = function(addressId){
        return $http({
            method: 'POST',
            url: '/api/address/delete',
            data: { addressid: addressId }
        }).then(function(response){
            return response.data;
        }).catch(function(response){
            console.log(response);
        })
    }
}

angular.module('app').service('userService', userService);