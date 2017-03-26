var bcrypt = require('bcryptjs');
var app = require('../index.js');
var db = app.get('db');




var dbController = {
    getStoreElements: function(req, res, next) {
        db.getStoreElements(function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else if (!result) {
                res.status(501).send();
            } else {
                req.result = result;
                next();
            }
        });
    },
    getProductById: function(req, res, next) {

        db.getProductById([req.params.id], function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else if (!result) {
                res.status(501).send();
            } else {
                req.result = result;
                next();
            }
        });
    },

    checkoutCart: function(req, res, next) {

        var cartid;

        console.log(req.session.passport);

        var result = db.carts.insertSync({userid: req.session.passport.user}, function(error, result){
          if (error) {
              res.status(500).send(error);
          }
        });

        var cartId = result[0].cart;

        db.createCart([req.session.passport.user], function(error, result) {

            if (error) {
                res.status(500).send(error);
            } else {
                req.session.cart.forEach(function(element){
                  db.checkoutCart([cartId, element.productid, element.optionid, element.quantity, element.discount], function(error, result) {
                    if (error) {
                        res.status(500).send(error);
                    }
                  });
                });
            }
        });

        res.status(200).send(cartId);
    },

    registerUser: function(req, res, next){

      console.log(req.body);

      var newUser = db.users.insertSync({useremail: req.body.useremail, userfirstname: req.body.userfirstname, userlastname: req.body.userlastname, useraddress1: req.body.useraddress1, useraddress2: req.body.useraddress2});

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.userpassword);

      console.log(hash);

      console.log(db);


      db.passwords.insert({userid: newUser.userid, passwordhash: hash});

      res.status(200).send(req.body.useremail);
    }

};

function insertIntoCartItemsCreator(number) {

    var cartid = number;

    return function(element) {

    };
}







module.exports = dbController;
