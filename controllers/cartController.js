var app = require('../index.js');

var db = app.get('db');

var cart = {
  addProductToCart: function(req, res) {

      var cartObj = req.body;

      if (Array.isArray(req.session.cart)) {
        addCartObjToArray(req.session.cart, cartObj);
      } else {
          cartObj.tempid = generateTemporaryCartElementId();
          req.session.cart = [cartObj];
      }

      res.status(200).send(cartObj);
  },

  getCart: function(req, res) {
      res.status(200).json(req.session.cart);
  },

  updateCartElement: function(req, res){
    var newCartObj = req.body;
    var cartObj = req.session.cart.find(createCallbackKeyEqualsValue('tempid', newCartObj.cartelementid));

    cartObj = newCartObj;
  },

  clearCart: function(req, res){
    req.session.cart = [];
    res.status(200).send();
  }

};


function addCartObjToArray(cartArray, newCartObj){


  //search for cartObj with same optionid

  cartObj = cartArray.find(createCallbackKeyEqualsValue('optionid', newCartObj.optionid));

  //if found add quantity and price

  if(cartObj){
    cartObj.quantity += newCartObj.quantity;
  }else{
    newCartObj.tempid = generateTemporaryCartElementId();
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
