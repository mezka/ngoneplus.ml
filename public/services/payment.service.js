function paymentService($http) {

    this.charge = function(paymentinfo) {
        return $http({
            method: 'POST',
            url: '/api/cart/charge',
            data: {
                orderid: paymentinfo.orderid,
                cardnumber: paymentinfo.cardnumber,
                cvc: paymentinfo.cvc,
                exp_year: paymentinfo.exp_year,
                exp_month: paymentinfo.exp_month
            }
        }).then(function(response) {
            return response.data;
        }).catch(function(response) {
            console.log(response);
        });
    };
}

angular.module('app').service('paymentService', paymentService);
