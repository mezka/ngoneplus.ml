function ordersController(orderlist, $state) {
    
    const vm = this;

    vm.orderlist = orderlist;
    
    vm.payForOrder = function(orderid){
        $state.go('payment', {orderid});
    };
}

angular.module('app').controller('ordersController', ordersController);