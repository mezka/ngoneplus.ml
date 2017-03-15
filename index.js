var Express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');

var port = 9876;

var app = Express();
app.use(Express.static('public'));

var connectionString = "postgres://mezka@localhost:5432/oneplus";

// connect to Massive and get the db instance. You can safely use the
// convenience sync method here because its on app load
// you can also use loadSync - it's an alias
var massiveInstance = massive.connectSync({connectionString : connectionString});

// Set a reference to the massive instance on Express' app:
app.set('db', massiveInstance);

var db = app.get('db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/store', function(req, res) {
    console.log('/api/store');

    db.get_store_element_data(function(error, result) {
      res.status(200).send(result);
    });
});

app.get('/api/products/:productid', function(req, res){

  var productid = req.param('productid');

  db.get_product_by_id([productid], function(error, result){
    console.log(result);
    res.status(200).send(result);
  });

});



app.listen(port, function() {
    console.log('Listening on port: ', port);
});
