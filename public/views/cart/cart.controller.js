function cartController(items, addresses, cartService, $state, Swal, authService) {
  
  const cart = this;

  cart.items = items ? items : [];
  cart.addresses = addresses;
  cart.selectedAddressId = addresses && addresses.length ? addresses[0].id : null;

  cart.calculateSubTotal = () => cart.items.reduce((prevValue, item) =>  prevValue + item.quantity * item.optionprice, 0);
  cart.calculateTotal = () => cart.items.reduce((prevValue, item) =>  prevValue + item.quantity * item.optionprice * (100 - (item.discount? item.discount : 0)) / 100 , 0);
  cart.calculateTotalQty = () => cart.items.reduce((prevValue, item) => prevValue + item.quantity, 0);
  cart.calculateTotalDiscount = () => cart.items.reduce((prevValue, item) =>  prevValue + item.quantity * item.optionprice * (100 - (item.discount? item.discount : 0)) / 100, 0)

  cart.deleteCartItem = (index) => {
    cartService.deleteCartItem(cart.items[index].optionid)
      .then(function (data) { cart.items.splice(index, 1) })
      .catch(function (error) { console.log(error) });
  };

  cart.checkoutCart = () => {
    if(cart.items.length){
      authService.isAuthenticated()
      .catch(function () {
        Swal.fire({
          icon: 'error',
          title: "User is not logged in",
          showConfirmButton: false,
          html: 'Redirecting to Login Panel ...',
          timer: 2000
        })
        return setTimeout($state.go.bind(this, 'login'), 2000);
      });

      if (!cart.addresses || !cart.addresses.length) {
        Swal.fire({
          icon: 'error',
          title: "User has no shipping address loaded",
          showConfirmButton: false,
          html: 'Redirecting to User Control Panel ...',
          timer: 2000
        })
        return setTimeout($state.go.bind(this, 'usercp', { modal: true }), 2000);
      }
      
      cartService.checkoutCart(cart.selectedAddressId)
      .then(function (data) {
        $state.go('payment', { orderid: data.id });
      })
      .catch(function (error) {
        if (error.status === 401) {
          $state.go('login');
        }
      });
    }
  };
}

angular.module('app').controller('cartController', cartController);
