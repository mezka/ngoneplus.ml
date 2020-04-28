function ordersController(orderlist, $state) {
    
    var vm = this;

    vm.orderlist = orderlist;
    
    vm.payForOrder = function(orderid){
        $state.go('payment', {orderid: orderid});
    };
}

angular.module('app').controller('ordersController', ordersController);