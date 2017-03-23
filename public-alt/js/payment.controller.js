function paymentController(paymentService){
  this.charge = function(info){
    paymentService.charge(info).then(function(data){
      console.log(data);
    });
  };
}


angular.module('app').controller('paymentController', paymentController);
