function ordersController(pendingorders, arraySumHelperService) {
    var orders = this;

    orders.pendingorders = pendingorders.map(pendingOrderMapper);

    console.log(pendingorders);

}

function pendingOrderMapper(order) {

    order.orderprice = order.orderitems.reduce(
        function (acum, element) {
            return acum + element.quantity * element.optionprice * (100 - element.discount) / 100
        }, 0);

    return order;
}


angular.module('app').controller('ordersController', ordersController);