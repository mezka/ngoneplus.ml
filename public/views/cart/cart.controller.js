function cartController(items, cartService, $state, $scope) {
    cart = this;
    cart.items = items? items : [];

    cart.calculateSubTotal = function() {
        return cart.items.reduce(function(prevValue, currentItem){ return prevValue + currentItem.quantity * currentItem.optionprice }, 0);
    };
    cart.calculateTotal = function() {
      return cart.items.reduce(function(prevValue, currentItem){
        return prevValue + calculateDiscountedPrice(currentItem);
      }, 0);
    };

    cart.calculateTotalQty = function(){
      return cart.items.reduce(function(prevValue, currentItem){ return prevValue + currentItem.quantity}, 0)
    };

    cart.calculateTotalDiscount = function(){
      return cart.items.reduce(function(prevValue, currentItem){
        return prevValue + calculateItemDiscount(currentItem);
      }, 0)
    };

    cart.deleteCartItem = function(index){
      cartService.deleteCartItem(cart.items[index].tempid)
      .then(function(data){ cart.items.splice(index, 1) })
      .catch(function(error){ console.log(error) });
    };

    cart.clearCart = function() {
      cartService.clearCart()
      .then(function(data){})
      .catch(function(error){ console.log(error) });

      $scope.items = [];
    };

    cart.checkoutCart = function(){
      cartService.checkoutCart($state.go.bind(this, 'checkout'), $state.go.bind(this, 'login'));
    };
}

function calculateItemDiscount(item){
  if(item.discount){
    return item.quantity * item.optionprice  - item.quantity * item.optionprice * (100 - item.discount) / 100;
  } else {
    return 0;
  }
}

function calculateDiscountedPrice(item){
  if(item.discount){
    return item.quantity * item.optionprice * (100 - item.discount) / 100;
  } else {
    return item.quantity * item.optionprice;
  }
}

angular.module('app').controller('cartController', cartController);
