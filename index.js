//REQUIRING MODULES
const massive = require('massive');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

//LOAD DOTENV CONFIG

try{
    require('dotenv').config();
} catch(error) {
    throw error;
}

//DECLARING APP, ALSO MAKING IT AVAILABLE FOR PASSPORT SERVICE

const app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET_KEY
}));

app.use(express.static(__dirname + '/public/dist'));

massive({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
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
        failureMessage: true
    }));

    const dbController = require('./controllers/dbController.js');
    const cartController = require('./controllers/cartController.js');
    const orderController = require('./controllers/orderController.js');
    const authController = require('./controllers/authController.js');
    const userController = require('./controllers/userController.js');
    const locationApiController = require('./controllers/locationApiController.js');

    //AUTH ENDPOINTS

    app.get('/api/login/check', authController.authorize, authController.sendAuthSuccesful);
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
    app.post('/api/cart/checkout', authController.authorize, cartController.checkoutCart);
    app.post('/api/cart/clear', cartController.clearCart);
    app.post('/api/cart/delete', cartController.deleteCartElement);

    //PAYMENT ENDPOINTS

    app.post('/api/cart/charge', authController.authorize, orderController.makePayment);

    //ORDER ENDPOINTS
    app.get('/api/orders', authController.authorize, orderController.getOrdersByUserId);

    //USER ENDPOINTS
    app.get('/api/user', authController.authorize, userController.getUserData);

    //ADDRESS ENDPOINTS

    app.get('/api/address', authController.authorize, userController.getAddresses);
    app.post('/api/address/add', authController.authorize, userController.addAddress);
    app.post('/api/address/delete', authController.authorize, userController.deleteAddress);
    
    //COUNTRY LIST ENDPOINTS

    app.get('/api/location/countries', locationApiController.getCountries);
    app.get('/api/location/countries/:country_iso', locationApiController.getStatesByCountryIso);
    app.get('/api/location/countries/:country_iso/:geo_name', locationApiController.getCitiesByCountryIsoAndStateGeoName)

    app.listen(process.env.APPLICATION_PORT, function () {
        console.log(`Listening on port ${process.env.APPLICATION_PORT} ...`);
    });
});