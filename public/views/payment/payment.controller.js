function paymentController(paymentService, $state, Swal){

  const vm = this;

  vm.info = {};
  vm.info.orderid = $state.params.orderid

  vm.charge = (event) => {

    event.preventDefault();

    paymentService.charge(vm.info)
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
