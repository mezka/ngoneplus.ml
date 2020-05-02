angular.module('app')
    .directive('newAddressForm', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            countries: '=',
            refreshUserData: '&'
        },
        template:`
                    <div class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new address</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                            <form class="modal-body" ng-submit="handleFormSubmit()">
                                <div class="form-group row">
                                    <label for="address1" class="col-sm-3 col-form-label">Address 1</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="oneplus-input w-100" name="address1" ng-model="data.address1" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="address2" class="col-sm-3 col-form-label">Address 2</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="oneplus-input w-100" name="address2" ng-model="data.address2">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="country" class="col-sm-3 col-form-label">Country</label>
                                    <div class="col-sm-9">
                                        <select name="country" class="oneplus-input w-100" ng-model="data.country"
                                            ng-options="country.name for country in countries track by country.country_iso_code"
                                            ng-change="handleCountrySelect()" required></select>
                                    </div>
                                </div>
                                <div class="form-group row ng-scope-margin-fix" ng-if="data.country && states.length !== 0">
                                    <label for="state" class="col-sm-3 col-form-label">Province/District</label>
                                    <div class="col-sm-9">
                                        <select name="state" class="oneplus-input w-100" ng-model="data.state"
                                            ng-options="state.name for state in states track by state.state_id"
                                            ng-change="handleStateSelect()" required></select>
                                    </div>
                                </div>

                                <div class="form-group row ng-scope-margin-fix" ng-if="data.state && cities.length !== 0">
                                    <label for="city" class="col-sm-3 col-form-label">City/Town</label>
                                    <div class="col-sm-9">
                                        <select name="city" class="oneplus-input w-100" ng-model="data.city"
                                            ng-options="city.name for city in cities track by city.geoname_id" required></select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="zipcode" class="col-sm-3 col-form-label">Postal Code</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="oneplus-input w-100" name="zipcode" ng-model="data.zipcode" required>
                                    </div>
                                </div>
                            </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary background-oneplus-red" ng-click="handleFormSubmit()">Save</button>
                        </div>
                        </div>
                    </div>
                    </div>
                 `,

        link: function(scope, element){

            scope.$on('toggleModal', function(){
                console.log('hitmodal');
                element.modal()
            });
            
            scope.toggle = function(){
                element.modal()
            };
        },
        
        controller: function newAddressFormController($scope, locationService, userService){
            

            $scope.data = {
                address1: '',
                address2: '',
                zipcode: '',
                country: null,
                state: null,
                city: null
            };

            $scope.getParsedData = function(){
                return {
                    address1: $scope.data.address1,
                    address2: $scope.data.address2,
                    city: $scope.data.city? $scope.data.city.name : null,
                    state: $scope.data.state? $scope.data.state.name : null,
                    country: $scope.data.country.name,
                    zipcode: $scope.data.zipcode,
                    country_iso_code:  $scope.data.country.country_iso_code,
                    state_id: $scope.data.state? $scope.data.state.state_id : null,
                    geoname_id: $scope.data.city? $scope.data.city.geoname_id : null
                }
            }

            $scope.states = [];
            $scope.cities = [];

            $scope.handleCountrySelect = function(){

                locationService.getStatesByCountryIso($scope.data.country.country_iso_code)
                .then(function(data){
                    $scope.states = data;
                    
                    if($scope.states.length === 0){
                        $scope.cities = [];
                    }
                })
            }
        
            $scope.handleStateSelect = function(){
                if($scope.data.state){
                    locationService.getCitiesByCountryIsoAndStateGeoName($scope.data.state.country_iso_code, $scope.data.state.state_id)
                    .then(function(data){
                        $scope.cities = data;
                    })
                }
            }
        
            $scope.handleFormSubmit = function(){

                userService.addUserAddress($scope.getParsedData())
                .then(function(result){

                    $scope.refreshUserData();
                    setTimeout($scope.toggle, 500);

                });
            }
        },
    }
});