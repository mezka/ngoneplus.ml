function paymentController(paymentService, $state){

  var payment = this;
  payment.orderid = $state.params.orderid;

  console.log('hit');
  console.log($state.params);

  payment.charge = function(){

    console.log(payment)

    // checkoutService.charge(checkout.info).then(function(data){
    //   console.log(data);
    //   $state.go('order', {stripeObj: data});
    // });
  };
}


angular.module('app').controller('paymentController', paymentController);
