var Express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var session = require('express-session');


var app = Express();
var port = 9876;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static('public-alt'));

app.use(session({
  saveUninitialized: true,
  secret: 'old watch'
}));

var connectionString = "postgres://mezka@localhost:5432/oneplus";

// connect to Massive and get the db instance. You can safely use the
// convenience sync method here because its on app load
// you can also use loadSync - it's an alias
var massiveInstance = massive.connectSync({connectionString : connectionString});

// Set a reference to the massive instance on Express' app:
app.set('db', massiveInstance);

var db = app.get('db');

app.get('/api/store', function(req, res) {

    db.get_store_elements(function(error, result) {
      res.status(200).send(result);
    });
});

app.get('/api/product/:id', function(req, res) {
    db.get_product_by_id([req.param('id')], function(error, result) {
      res.status(200).send(result);
    });
});

app.post('/api/cart/add', function(req, res){
  //todo
});

app.get('/api/cart', function(req, res){
  //todo
});



app.listen(port, function(){
    console.log('Listening on port: ', port);
});

function deleteNullValues(obj){
  for(var key in obj){
    if(obj[key] === null)
      delete obj[key];
  }
}
