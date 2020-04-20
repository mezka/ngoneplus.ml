var app = require('../index.js');

var db = app.get('db');

var cart = {
  addProductToCart: function(req, res) {

      var cartObj = req.body;

      if (Array.isArray(req.session.cart)) {
        addCartObjToArray(req.session.cart, cartObj);
      } else {
          req.session.cart = [cartObj];
      }

      res.status(200).send(cartObj);
  },

  getCart: function(req, res) {
      res.status(200).json(req.session.cart);
  },

  updateCartElement: function(req, res){
    var newCartObj = req.body;
    var cartObj = req.session.cart.find(createCallbackKeyEqualsValue('tempid', newCartObj.tempid));

    cartObj = newCartObj;

    res.status(200).json(rew.session.cart);
  },

  deleteCartElement: function(req, res){

    var toDeleteIndex = req.session.cart.findIndex(createCallbackKeyEqualsValue('tempid', req.body.tempid));

    if(toDeleteIndex !== -1)
      req.session.cart.splice(toDeleteIndex, 1);

    res.status(200).json(req.session.cart);
  },

  clearCart: function(req, res){
    req.session.cart = [];
    res.status(200).send();
  },

  checkoutCart: function (req, res, next) {

    db.order.insert(
        {
            userid: req.session.passport.user,
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
        res.status(200).send(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
}

};


function addCartObjToArray(cartArray, newCartObj){


  //search for cartObj with same optionid

  cartObj = cartArray.find(createCallbackKeyEqualsValue('optionid', newCartObj.optionid));

  //if found add quantity and price

  if(cartObj){
    cartObj.quantity += newCartObj.quantity;
  }else{
    cartArray.push(newCartObj);
  }
}

function createCallbackKeyEqualsValue(key, value){

  return function keyEqualsValue(element){
      return element[key] === value;
  };
}

var generateTemporaryCartElementId = createIterator();


function createIterator(){
  var count = 0;

  return function(){
    return count++;
  };
}

module.exports = cart;
