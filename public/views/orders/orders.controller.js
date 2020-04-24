function ordersController(arraySumHelperService, parseAddressObjToString) {
    
    var orders = this;
    
    orders.pendingorders = [
        {
            "id": 1,
            "createddate": "2020-04-23T16:12:00.783Z",
            "address1": "Alsina 2501",
            "address2": "",
            "city": "Balvanera",
            "state": "Buenos Aires F.D.",
            "country": "Argentina",
            "zipcode": 1090,
            "orderitems": [
                {
                    "productname": "OnePlus iPhone 6/6S Case",
                    "optionname": "Sandstone",
                    "quantity": 3,
                    "discount": 0,
                    "optionprice": 13.99,
                    "optionimages": [
                        "/cases/iphone6-6s-case/sandstone/back.png",
                        "/cases/iphone6-6s-case/sandstone/back-side-left.png"
                    ],
                }
            ],
            "orderprice": 41.97,
        },
    ];
    orders.pendingorders[0].address = parseAddressObjToString(orders.pendingorders[0]);
    
    
    console.log(orders.pendingorders);

    // orders.pendingorders = pendingorders.map(pendingOrderMapper);

}

function pendingOrderMapper(order) {

    order.orderprice = order.orderitems.reduce(
        function (acum, element) {
            return acum + element.quantity * element.optionprice * (100 - element.discount) / 100
        }, 0);

    return order;
}


angular.module('app').controller('ordersController', ordersController);