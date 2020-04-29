function cartController(items, addresses, cartService, $state, Swal, authService) {
    cart = this;
    cart.items = items? items : [];
    cart.addresses = addresses;
    cart.selectedAddressId = addresses && addresses.length? addresses[0].id : null;

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

      cart.items = [];
    };

    cart.checkoutCart = function(){

      authService.isAuthenticated()
      .catch(function(){
        Swal.fire({
          icon: 'error',
          title: "User is not logged in",
          showConfirmButton: false,
          html: 'Redirecting to Login Panel ...',
          timer: 2000
        })

        return setTimeout($state.go.bind(this, 'login'), 2000);
      });

      if(!cart.addresses || !cart.addresses.length ){
        Swal.fire({
          icon: 'error',
          title: "User has no shipping address loaded",
          showConfirmButton: false,
          html: 'Redirecting to User Control Panel ...',
          timer: 2000
        })


        setTimeout($state.go.bind(this, 'userControlPanel', { modal: true }), 2000);
        return;
      }

      cartService.checkoutCart(cart.selectedAddressId)
      .then(function(data){
        $state.go('payment', {orderid: data.id});
      })
      .catch(function(error){
        if(error.status === 401){
          $state.go('login');
        }
      })
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
