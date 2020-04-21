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
                <div class="collapse" id="collapseExample">
                    <form class="card card-body" ng-submit="collapseForm.handleFormSubmit()">
                        <div class="form-group row">
                            <label for="address1" class="col-sm-2 col-form-label">Address 1</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="address1" ng-model="collapseForm.data.address1" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="address2" class="col-sm-2 col-form-label">Address 2</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="address2" ng-model="collapseForm.data.address2">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="country" class="col-sm-2 col-form-label">Country</label>
                            <div class="col-sm-9">
                                <select name="country" class="form-control" ng-model="collapseForm.data.country"
                                    ng-options="country.name for country in collapseForm.countries track by country.country_iso_code"
                                    ng-change="collapseForm.handleCountrySelect()" required></select>
                            </div>
                        </div>
                        <div class="form-group row ng-scope-margin-fix" ng-if="collapseForm.data.country && collapseForm.states.length !== 0">
                            <label for="state" class="col-sm-2 col-form-label">Province/District</label>
                            <div class="col-sm-9">
                                <select name="state" class="form-control" ng-model="collapseForm.data.state"
                                    ng-options="state.name for state in collapseForm.states track by state.state_id"
                                    ng-change="collapseForm.handleStateSelect()" required></select>
                            </div>
                        </div>

                        <div class="form-group row ng-scope-margin-fix" ng-if="collapseForm.data.state && collapseForm.cities.length !== 0">
                            <label for="city" class="col-sm-2 col-form-label">City/Town</label>
                            <div class="col-sm-9">
                                <select name="city" class="form-control" ng-model="collapseForm.data.city"
                                    ng-options="city.name for city in collapseForm.cities track by city.geoname_id" required></select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="zipcode" class="col-sm-2 col-form-label">Postal Code</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="zipcode" ng-model="collapseForm.data.zipcode" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm">
                                <input type="submit" class="btn-oneplus-red btn-usercp" value="Save address">
                            </div>
                        </div>
                    </form>
                </div>
                 `,

        link: function(scope, element){

            
            scope.$on('toggleForm', function(){
                element.collapse('toggle')
            });
            
            scope.toggle = function(){
                element.collapse('toggle');
            };
        },
        
        controller: function newAddressFormController($scope, locationService, userService){
            
            var vm = this;

            vm.data = {
                address1: '',
                address2: '',
                zipcode: '',
                country: null,
                state: null,
                city: null
            };

            vm.getParsedData = function(){
                return {
                    address1: vm.data.address1,
                    address2: vm.data.address2,
                    city: vm.data.city? vm.data.city.name : null,
                    state: vm.data.state? vm.data.state.name : null,
                    country: vm.data.country.name,
                    zipcode: vm.data.zipcode,
                    country_iso_code:  vm.data.country.country_iso_code,
                    state_id: vm.data.state? vm.data.state.state_id : null,
                    geoname_id: vm.data.city? vm.data.city.geoname_id : null
                }
            }

            vm.states = [];
            vm.cities = [];

            vm.handleCountrySelect = function(){

                locationService.getStatesByCountryIso(vm.data.country.country_iso_code)
                .then(function(data){
                    vm.states = data;
                    
                    if(vm.states.length === 0){
                        vm.cities = [];
                    }
                })
            }
        
            vm.handleStateSelect = function(){
                if(vm.data.state){
                    locationService.getCitiesByCountryIsoAndStateGeoName(vm.data.state.country_iso_code, vm.data.state.state_id)
                    .then(function(data){
                        vm.cities = data;
                    })
                }
            }
        
            vm.handleFormSubmit = function(){

                userService.addUserAddress(vm.getParsedData())
                .then(function(result){

                    vm.refreshUserData();
                    setTimeout($scope.toggle, 500);

                }.bind(this));
            }
        },
        controllerAs: 'collapseForm',
        bindToController: true
    }
});