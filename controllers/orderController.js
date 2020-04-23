var app = require('../index.js');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var db = app.get('db');

var orderController = {

    getPendingOrders: async function(req, res, next){

        try{
            var pendingOrders = await db.getPendingOrders();
        } catch(error) {
            console.log(error);
            return res.status(500).send(error);
        }

        console.log(pendingOrders);

        return res.status(200).send(pendingOrders);
    },

    payOrder: async function(req, res, next){

        let user;

        try{
            user = await db.users.findOne({ userid: req.session.passport.user });
        } catch(err) {
            return res.status(500).send(err);
        }

        console.log(req.body);
        console.log(req.user);

        return res.status(200).send({'message': 'ok'});
    },

    makePayment: async function(req, res, next) {

        try{
            var user = await db.users.findOne({ userid: req.session.passport.user });
        } catch(err) {
            return res.status(500).send(err);
        }

        let amount = req.session.cart.reduce(function(sumTotal, currElement) {
            return sumTotal + currElement.quantity * currElement.optionprice;
        }, 0);

        // Create a new customer and then a new charge for that customer:
        stripe.customers.retrieve(user.stripeid)
        .then(function(customer) {

            return stripe.customers.createSource(customer.id, {
                source: {
                    object: 'card',
                    exp_month: req.body.exp_month,
                    exp_year: req.body.exp_year,
                    number: req.body.cardnumber,
                    cvc: req.body.cvc
                }
            });
        }).then(function(source) {
            return stripe.charges.create({
                amount: amountToPennies(amount),
                currency: 'usd',
                customer: source.customer
            });
        }).then(function(charge) {
            return res.status(200).send(charge);
        }).catch(function(err) {
            console.log(err);
            return res.status(400).send(err);
        });
    }
};

var amountToPennies = function(amount) {
    return Math.floor(amount * 100);
};

module.exports = orderController;
