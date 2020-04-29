function paymentController(paymentService, $state, Swal){

  var payment = this;

  payment.info = {};
  payment.info.orderid = $state.params.orderid

  payment.charge = function(event){

    event.preventDefault();

    console.log(payment.info);

    paymentService.charge(payment.info)
    .then(function(data){
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Payment was successful',
        text: "You'll be redirected shortly",
        timer: 2000
      });

      $state.go('receipt', data);

    })
    .catch(function(error){
      Swal.fire({
        icon: 'error',
        title: error.statusText,
        text: error.data.message,
      })
    });
  };
}

angular.module('app').controller('paymentController', paymentController);
