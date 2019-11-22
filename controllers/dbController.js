const bcrypt = require('bcryptjs');
const app = require('../index.js');
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

    checkoutCart: function (req, res, next) {

        db.carts.insert(
            {
                userid: req.session.passport.user,
                cartitems: req.session.cart.map((element) => {
                    const { productname, optionname, imageurl, optionprice, tempid, ...cart } = element;
                    cart.cartid = undefined; //needed for deepInsert, read massiveJs docs for reference
                    return cart;
                })
            },
            {
                deepInsert: true,
            }
        )
        .then(result => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    registerUser: async function (req, res, next) {

        const hash = await bcrypt.hash(req.body.userpassword, 10);

        db.users.insert(
            {
                useremail: req.body.useremail,
                userfirstname: req.body.userfirstname,
                userlastname: req.body.userlastname,
                useraddress1: req.body.useraddress1,
                useraddress2: req.body.useraddress2,
                passwords: [
                    {
                        userid: undefined,
                        passwordhash: hash
                    }
                ]
            },
            {
                deepInsert: true
            }
        )
        .then(result => {
            res.status(200).send(req.body.useremail)
        })
        .catch(error => {
            res.status(500).send(error);
        })
    }
};

module.exports = dbController;
