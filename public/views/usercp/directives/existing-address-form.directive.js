angular.module('app')
    .directive('existingAddressForm', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                address: '=',
                countries: '=',
                refreshUserData: '&'
            },
            template: `
                <form class="card card-body mb-4" ng-submit="handleFormSubmit()">
                    <div class="form-group row mt-4">
                        <label for="address1" class="col-sm-2 col-form-label">Address 1</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="address1" ng-model="address.address1" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="address2" class="col-sm-2 col-form-label">Address 2</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="address2" ng-model="address.address2">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="country" class="col-sm-2 col-form-label">Country</label>
                        <div class="col-sm-9">
                            <select name="country" class="form-control" ng-model="address.country"
                                ng-options="country.name for country in countries track by country.country_iso_code"
                                ng-change="handleCountrySelect()" required></select>
                        </div>
                    </div>
                    <div class="form-group row ng-scope-margin-fix" ng-if="states.length !== 0">
                        <label for="state" class="col-sm-2 col-form-label">Province/District</label>
                        <div class="col-sm-9">
                            <select name="state" class="form-control" ng-model="address.state"
                                ng-options="state.name for state in states track by state.state_id"
                                ng-change="handleStateSelect()" required></select>
                        </div>
                    </div>
                    <div class="form-group row ng-scope-margin-fix" ng-if="address.state && cities.length !== 0">
                        <label for="city" class="col-sm-2 col-form-label">City/Town</label>
                        <div class="col-sm-9">
                            <select name="city" class="form-control" ng-model="address.city"
                                ng-options="city.name for city in cities track by city.geoname_id" required></select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="zipcode" class="col-sm-2 col-form-label">Postal Code</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" name="zipcode" ng-model="collapseForm.address.zipcode" required>
                        </div>
                    </div>

                    <div class="row justify-content-around">
                        <div class="col-sm-4" ng-click="deleteAddress($event)">
                            <button class="btn-oneplus-red btn-usercp">Delete</button>
                        </div>
                        <div class="form-group col-sm-4">
                            <input class="btn-oneplus-red btn-usercp" type="submit" value="Save"/>
                        </div>
                    </div>
                </form>
            `,
            controller: function($scope, locationService, userService){
                
                $scope.states = [];
                $scope.cities = [];

                locationService.getStatesByCountryIso($scope.address.country.country_iso_code)
                .then(function(data){
                    return $scope.states = data; 
                })
                .then(function(data){
                    if(data.length){
                        locationService.getCitiesByCountryIsoAndStateGeoName($scope.address.country.country_iso_code, $scope.address.state.state_id)
                        .then(function(data){
                            $scope.cities = data;
                        })
                    }
                });

                $scope.deleteAddress = function(event){
                    
                    event.preventDefault();
                    
                    userService.deleteUserAddress($scope.address.addressid)
                    .then(function(data){
                        $scope.refreshUserData();
                    });
                    
                }
            }
        };
    }
)

    