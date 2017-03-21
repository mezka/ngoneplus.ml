//REQUIRING MODULES
var massive = require('massive');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');


//DECLARING APP, ALSO MAKING IT AVAILABLE FOR PASSPORT SERVICE

var app = module.exports = express();
var port = 9876;

//CONNECT db USING connectionString

var connectionString = "postgres://mezka@localhost:5432/oneplus";
var massiveInstance = massive.connectSync({
    connectionString: connectionString
});

//SET db PROPERTY FOR BEING ABLE TO USE IT APPLICATION WIDE

app.set('db', massiveInstance);
var db = app.get('db');

//REQUIRING CONTROLLERS

var dbController = require('./controllers/dbController.js');
var cartController = require('./controllers/cartController.js');
var authController = require('./controllers/authController.js');

//ADD BODY PARSER

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//GET PRE CONFIGURED PASSPORT INSTANCE

var passport = require('./services/passport.js');

//CONFIGURE AND ADD SESSION, INITIALIZE PASSPORT AND ADD IT, INITIALIZE PASSPORT SESSION AND ADD IT

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'old watch'
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/login/success',
    failureRedirect: '/api/login/failure',
    failureFlash: false
}));

//ADD STATIC SERVE

app.use(express.static(__dirname + '/public-alt'));

//ADD cors

app.use(cors());

//AUTH METHODS


app.get('/api/login/success', authController.sendAuthSuccesful);
app.get('/api/login/failure', authController.sendAuthFailed);
app.get('/logout', authController.logout);

//PRODUCT DATA METHODS

app.get('/api/store', dbController.getStoreElements, function(req, res){
  res.status(200).send(req.result);
});

app.get('/api/product/:id', dbController.getProductById, function(req, res){
  res.status(200).send(req.result);
});

//CART METHODS

app.post('/api/cart', cartController.addProductToCart);
app.get('/api/cart', cartController.getProductFromCart);


//LISTEN TO PORT 9876

app.listen(port, function() {
    console.log('Listening on port: ', port);
});
