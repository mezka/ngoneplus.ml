function cartController(items, cartService, $state) {
    this.items = items;

    this.clearCart = function() {
        cartService.clearCart().then(function(data) {
            console.log(data);
        });

        this.items = [];
        items = [];

        this.calculateTotal();
    };

    this.calculateTotal = function() {

        if (!items.length)
            return 0;
        else if (items.length === 1) {
            return items[0].optionprice * items[0].quantity;
        } else {
            return items.reduce(function(prevElement, currElement) {
                return prevElement.quantity * prevElement.optionprice + currElement.quantity * curreElement.optionprice;
            });
        }
    };

    this.checkoutCart = function(){
      cartService.checkoutCart().then(function(data){
        console.log(data);
      });
      $state.go('checkout');
    };

}

angular.module('app').controller('cartController', cartController);
