function paymentController(paymentService, cartid, $state){
  this.charge = function(info){
    paymentService.charge(info).then(function(data){
      console.log(data);
      $state.go('summary', {stripeObj: data});
    });


  };
}


angular.module('app').controller('paymentController', paymentController);
