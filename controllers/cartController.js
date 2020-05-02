const app = require('../index.js');
const db = app.get('db');

const cartController = {
  addProductToCart: function(req, res) {

      const cartObj = req.body;

      if (req.session.cart) {
        const cartObjWithSameOptionId = req.session.cart.find(function(element){ return element.optionid === this.optionid }, cartObj);

        if(cartObjWithSameOptionId){
          cartObjWithSameOptionId.quantity++;
        } else {
          req.session.cart.push(cartObj);
        }

      } else {
          req.session.cart = [cartObj];
      }

      return res.status(200).send(req.session.cart);
  },

  getCart: function(req, res) {
      return res.status(200).json(req.session.cart);
  },

  updateCartElement: function(req, res){
    const newCartObj = req.body;
    const idxToUpdate = req.session.cart.findIndex(function(element) { return element.optionid === this.optionid }, newCartObj);

    if(idxToUpdate !== -1){
      req.session.cart[idxToUpdate] = newCartObj;
    }

    return res.status(200).json(req.session.cart);
  },

  deleteCartElement: function(req, res){
    const cartObj = req.body;
    const idxToDelete = req.session.cart.findIndex(function(element) { return element.optionid === this.optionid }, cartObj);

    if(idxToDelete !== -1)
      req.session.cart.splice(idxToDelete, 1);

    return res.status(200).json(req.session.cart);
  },

  clearCart: function(req, res){
    req.session.cart = [];
    return res.status(200).send({});
  },

  checkoutCart: function (req, res, next) {

    db.order.insert(
        {
            userid: req.session.passport.user,
            addressid: req.body.addressid,
            orderitem: req.session.cart.map((element) => {
                const { productname, optionname, imageurl, optionprice, ...orderitem } = element;
                orderitem.orderid = undefined; //needed for deepInsert, read massiveJs docs for reference
                orderitem.discount = orderitem.discount? orderitem.discount : 0;
                return orderitem;
            })
        },
        {
            deepInsert: true,
        }
    )
    .then(result => {
        return res.status(200).send(result);
    })
    .catch(error => {
        console.log(error);
        return res.status(500).send(error);
    })
  }
};

module.exports = cartController;
