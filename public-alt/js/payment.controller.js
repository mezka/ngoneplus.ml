function paymentController(paymentService, cartid){
  this.charge = function(info){
    paymentService.charge(info).then(function(data){
      console.log(data);
    });
  };
}


angular.module('app').controller('paymentController', paymentController);
