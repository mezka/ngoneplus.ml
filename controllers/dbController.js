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

        db.createCart([req.session.passport.user], function(error, result) {

            if (error) {
                res.status(500).send(error);
            } else {
                req.session.cart.forEach(function(element){

                  db.checkoutCart([result[0].cartid, element.productid, element.optionid, element.quantity, element.discount], function(error, result) {
                    if (error) {
                        res.status(500).send(error);
                    }

                    db.getOrder(result[0].cartid, function(error, result){
                      if (error) {
                          res.status(500).send(error);
                      }

                      res.status(200).send(result);
                    });

                });
              });


            }
        });
    },

    registerUser: function(req, res, next){
      db.addUser([req.body.useremail, req.body.username, req.body.userlastname, req.body.useraddress1, req.body.useraddress2], function(error, result){
        if(error){
          res.status(500).send(error);
        }else{
          res.status(200).send(response);
        }
      });
    }

};

function insertIntoCartItemsCreator(number) {

    var cartid = number;

    return function(element) {

    };
}







module.exports = dbController;
