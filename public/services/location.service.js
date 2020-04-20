function locationService($http) {
    this.getCountries = function () {
        return $http({
            method: 'GET',
            url: '/api/location/countries',
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
    };

    this.getStatesByCountryIso = function (country_iso) {
        return $http({
            method: 'GET',
            url: '/api/location/countries/' + country_iso,
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
    };

    this.getCitiesByCountryIsoAndStateGeoName = function(country_iso, geo_name){
        return $http({
            method: 'GET',
            url: '/api/location/countries/' + country_iso + '/' + geo_name 
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
    };
}

angular.module('app').service('locationService', locationService);