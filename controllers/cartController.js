var cart = {
  addProductToCart: function(req, res) {
      console.log(req.body);

      if (Array.isArray(req.session.cart)) {
          req.session.cart.push(req.body);
      } else {
          req.session.cart = [req.body];
      }

      res.status(200).send('ok');
  },

  getProductFromCart: function(req, res) {
      res.status(200).json(req.session.cart);
  }
};


module.exports = cart;
