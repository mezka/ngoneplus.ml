angular.module('app')
    .directive('existingAddressForm', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                refreshUserData: '&',
                address: '='
            },
            template: `
                <form class="existing-address-form my-4">
                    <div class="form-group row address-row-flex">
                        <label for="address1" class="col-3 col-form-label">Address 1</label>
                        <div class="col-8">
                            <input class="form-control text-center" type="text" name="address1" ng-model="address.address1" required disabled>
                        </div>
                    </div>
                    <div class="form-group row address-row-flex">
                        <label for="address2" class="col-3 col-form-label">Address 2</label>
                        <div class="col-8">
                            <input class="form-control text-right" type="text" name="address2" ng-model="address.address2" disabled>
                        </div>
                    </div>
                    <div class="form-group row address-row-flex">
                        <label for="country" class="col-3 col-form-label">Country</label>
                        <div class="col-8">
                            <input class="form-control text-center" type="text" name="country" ng-model="address.country.name" disabled>
                        </div>
                    </div>
                    <div class="form-group row ng-scope-margin-fix address-row-flex" ng-if="address.state">
                        <label for="state" class="col-3 col-form-label">District</label>
                        <div class="col-8">
                            <input class="form-control text-center" type="text" name="state" ng-model="address.state.name" disabled>
                        </div>
                    </div>
                    <div class="form-group row ng-scope-margin-fix address-row-flex" ng-if="address.city">
                        <label for="city" class="col-3 col-form-label">City/Town</label>
                        <div class="col-8">
                            <input class="form-control text-center" type="text" name="city" ng-model="address.city.name" disabled>
                        </div>
                    </div>
                    <div class="form-group row address-row-flex">
                        <label for="zipcode" class="col-3 col-form-label">Zip Code</label>
                        <div class="col-8">
                            <input type="text" class="form-control text-center" name="zipcode" ng-model="address.zipcode" required disabled>
                        </div>
                    </div>

                    <div class="w-100 d-flex justify-content-center">
                        <button class="btn-delete btn-oneplus-red" ng-click="deleteAddress($event)">Delete</button>
                    </div>
                </form>
            `,
            controller: function($scope, userService){

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

    