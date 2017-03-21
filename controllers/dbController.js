var app = require('../index');
var db = app.get('db');


var dbController = {
  getStoreElements: function(req, res, next) {
    db.getStoreElements(function(error, result) {
        if(error){
          res.status(500).send(error);
        }else if(!result){
          res.status(501).send();
        }else {
          req.result = result;
          next();
        }
    });
  },
  getProductById: function(req, res, next) {

    db.getProductById([req.params.id], function(error, result) {
      if(error){
        res.status(500).send(error);
      }else if(!result){
        res.status(501).send();
      }else {
        req.result = result;
        next();
      }
    });
  },

};


module.exports = dbController;
