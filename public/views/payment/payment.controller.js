function paymentController(paymentService, $state, Swal){

  var payment = this;

  payment.info = {};
  payment.info.orderid = $state.params.orderid

  payment.charge = function(event){

    event.preventDefault();

    console.log(payment.info);

    paymentService.charge(payment.info).then(function(data){
      
      Swal.fire({
        icon: 'success',
        title: 'Payment was successful',
        text: "You'll be redirected shortly",
        timer: 2000
      });

      setTimeout($state.go.bind(this, 'userControlPanel'), 2000);
    });
  };
}


angular.module('app').controller('paymentController', paymentController);
