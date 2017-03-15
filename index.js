var Express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var port = 9876;

var app = Express();
var connectionString = "postgres://mezka@localhost:5432/oneplus";

// connect to Massive and get the db instance. You can safely use the
// convenience sync method here because its on app load
// you can also use loadSync - it's an alias
var massiveInstance = massive.connectSync({connectionString : connectionString});

// Set a reference to the massive instance on Express' app:
app.set('db', massiveInstance);

var db = app.get('db');

app.get('/api/products', function(req, res) {
    console.log('Server works ...');

    db.get_all_products(function(err, res) {
      console.log(res);
      console.log(err);
    });

    res.status(200).send('Worked');
});

app.listen(port, function() {
    console.log('Listening on port: ', port);
});
