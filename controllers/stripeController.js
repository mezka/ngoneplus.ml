var stripe = require('stripe')('sk_test_kZzzOMg8ZgcslrfKWyXyZk1x');
var app = require('../index.js');

var db = app.get('db');

var stripeController = {
    makePayment: function(req, res, next) {

        var user = db.users.findSync({
            useremail: "emiliano_mesquita@hotmail.com"
        });

        user = user[0];

        var useremail = "emiliano_mesquita@hotmail.com";

        console.log(user);

        // Create a new customer and then a new charge for that customer:
        stripe.customers.create({
            email: useremail
        }).then(function(customer) {
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
                amount: amountToPennies(req.body.amount),
                currency: 'usd',
                customer: source.customer
            });
        }).then(function(charge) {
            // New charge created on a new customer
            console.log(charge);
        }).catch(function(err) {
            // Deal with an error
            console.log(err);
        });

        res.status(200).send();
    }
};


var amountToPennies = function(amount) {
    return Math.floor(amount * 100);
};


module.exports = stripeController;
