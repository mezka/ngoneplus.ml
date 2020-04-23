function paymentController(paymentService, $state){

  var payment = this;

  payment.info = {};
  payment.info.orderid = $state.params.orderid

  payment.charge = function(event){

    event.preventDefault();

    console.log(payment.info);

    paymentService.charge(payment.info).then(function(data){
      console.log(data);
    });
  };
}


angular.module('app').controller('paymentController', paymentController);
