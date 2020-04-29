var app = require('../index.js');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var db = app.get('db');

var orderController = {

    getOrdersByUserId: async function(req, res, next){

        try{
            var orders = await db.getOrdersByUserId(req.session.passport.user);
        } catch(error) {
            console.log(error);
            return res.status(500).send(error);
        }

        return res.status(200).send(orders);
    },

    makePayment: async function(req, res, next) {

        try{
            var order = await db.getOrderItemsAndUserByOrderId(req.body.orderid);
        } catch(err){
            res.status(500).send(err);
        }
            
        order = order[0];

        const amount = order.orderitems.reduce(function(sumTotal, currElement) {
            return sumTotal + currElement.quantity * currElement.optionprice * ((100 - currElement.discount) / 100);
        }, 0);

        stripe.customers.retrieve(order.stripeid)
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
        }).then(async function(responseData) {
            try{
                var paid = await db.order.update(req.body.orderid, { paid: true });
            } catch(err){
                return res.status(500).send(err);
            }

            return res.status(200).send(charge);
        }).catch(function(err) {

            switch (err.type) {
                case 'api_connection_error':
                case 'api_error':
                case 'authentication_error':
                case 'idempotency_error':
                case 'invalid_request_error':
                case 'rate_limit_error':
                case 'validation_error':
                    res.status(err.statusCode).send({type: err.type, message: "Error: Payment failed, there was an error regarding the payment service provider but nothing was charged, please contact an administrator."});
                    break;
                case 'card_error':
                    res.status(err.statusCode).send({type: err.type, message: err.message});
                    break;
            }
            
            return res.status(500).send(err);
        });
    }
};

var amountToPennies = function(amount) {
    return Math.floor(amount * 100);
};

module.exports = orderController;
