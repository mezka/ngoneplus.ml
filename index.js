//REQUIRING MODULES
const massive = require('massive');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

//DECLARING APP, ALSO MAKING IT AVAILABLE FOR PASSPORT SERVICE

const app = module.exports = express();
const port = 59876;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'some_secret_981$%'
}));

app.use(express.static(__dirname + '/public'));

massive({
    host: 'localhost',
    port: 5432,
    database: 'oneplus',
    user: 'oneplus',
    password: 'oneplus'
}).then(instance => {

    app.set('db', instance);

    //GET PRE CONFIGURED PASSPORT INSTANCE

    const passport = require('./services/passport.js');

    //ADD PASSPORT MIDDLEWARE

    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/api/login/success',
        failureRedirect: '/api/login/failure',
        failureFlash: false
    }));

    const dbController = require('./controllers/dbController.js');
    const cartController = require('./controllers/cartController.js');
    const stripeController = require('./controllers/stripeController.js');
    const authController = require('./controllers/authController.js');

    //AUTH ENDPOINTS

    app.get('/api/login/success', authController.sendAuthSuccesful);
    app.get('/api/login/failure', authController.sendAuthFailed);
    app.post('/api/logout', authController.authorize, authController.logout); //REQUIRES LOGIN
    app.post('/api/register', dbController.registerUser);

    //PRODUCT DATA ENDPOINTS

    app.get('/api/store', dbController.getStoreElements);

    app.get('/api/product/:id', dbController.getProductById, function (req, res) {
        res.status(200).send(req.result);
    });

    //CART ENDPOINTS

    app.post('/api/cart', cartController.addProductToCart);
    app.get('/api/cart', cartController.getCart);
    app.post('/api/cart/checkout', authController.authorize, dbController.checkoutCart); //REQUIRES LOGIN
    app.post('/api/cart/clear', cartController.clearCart);
    app.post('/api/cart/delete', cartController.deleteCartElement);

    //CHECKOUT ENDPOINTS

    app.post('/api/cart/charge', authController.authorize, stripeController.makePayment); //REQUIRES LOGIN


    app.listen(port, function () {
        console.log('Listening on port: ', port, '\n');
    });
});





