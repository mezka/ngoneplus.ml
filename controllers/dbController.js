const bcrypt = require('bcryptjs');
const app = require('../index.js');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = app.get('db');

const dbController = {
    getStoreElements: function (req, res, next) {

        db.getStoreElements()
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    },
    getProductById: function (req, res, next) {

        db.getProductById([req.params.id])
            .then(result => {
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    },

    registerUser: async function (req, res) {

        try{
            let user_exists = await db.users.findOne({useremail: req.body.useremail});

            if(user_exists){
                return res.status(409).send({message: 'user already exists'});
            }
        } catch (error){
            return res.status(500).send(error);
        }

        try{
            var hash = await bcrypt.hash(req.body.userpassword, 10);
        } catch(error){
            return res.status(500).send(error);
        }
    
        try {
            var customer = await stripe.customers.create({
                email: req.body.useremail
            });
        } catch(error){
            return res.status(500).send(error);
        }

        try {
            var user = await db.users.insert(
                {
                    useremail: req.body.useremail,
                    stripeid: customer.id,
                    userfirstname: req.body.userfirstname,
                    userlastname: req.body.userlastname,
                    password: [
                        {
                            userid: undefined, //needed for deepInsert, read massiveJs docs for reference
                            passwordhash: hash
                        }
                    ],
                },
                {
                    deepInsert: true,
                }
            );
        } catch(error){
            return res.status(500).send(error);
        }

        return res.status(200).send({user: req.body.useremail});
    }
};

module.exports = dbController;
