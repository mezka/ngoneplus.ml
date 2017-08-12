function paymentService($http) {

    this.charge = function(info) {
        return $http({
            method: 'POST',
            url: '/api/cart/charge',
            data: {
                cardnumber: info.cardnumber,
                cvc: info.cvc,
                exp_year: info.exp_year,
                exp_month: info.exp_month
            }
        }).then(function(response) {
            if (response.status === 200) {
                return response.data;
            }
        }).catch(function(response) {
            console.log(response.data);
        });
    };
}

angular.module('app').service('paymentService', paymentService);
