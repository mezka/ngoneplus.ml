const app = require('../index.js');
const db = app.get('db');

const address = {
    userHasLoadedAddress: function (req, res, next) {
        db.address.findOne({
            userid: req.session.passport.user,
        }).then(function (result) {
            if (!result) {
                res.status(412).send({ message: 'The user has not provided a valid address yet.' })
            }
            next();
        })
            .catch(function (error) {
                res.status(500).send(error);
            });
    },

    getAddresses: function (req, res) {
        db.address.find({
            userid: req.session.passport.user,
        }).then(function (result) {
            res.status(200).send(result);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
    },

    addAddress: async function (req, res) {

        console.log(req.body);

        try{
            var result =  await db.address.insert({
                    userid: req.session.passport.user,
                    address1: req.body.address1,
                    address2: req.body.address2,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zipcode: req.body.zipcode,
                    locationdata: [
                        {
                            address_id: undefined, //needed for deepInsert, read massiveJs docs for reference
                            country_iso_code: req.body.country_iso_code,
                            state_id: req.body.state? req.body.state_id : null,
                            geoname_id: req.body.city? req.body.geoname_id : null,
                        }
                    ]
                },
                {
                    deepInsert: true,
                }
            );
            
            console.log(result);

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

        return res.status(200).send({ message: 'Success' , result });
    },

    deleteAddress: async function(req, res){
        
        console.log(req.body);

        try{
            var deleteAddress = await db.address.destroy(req.body.addressid);
        } catch(error){
            res.status(500).send(error);
        }

        res.status(200).send({status: 'Ok', message: 'deleteAddress'});
    },

    getUserData: function (req, res) {

        db.getUserById(req.session.passport.user, {
            decompose: {
                pk: 'useremail',
                columns: ['useremail', 'userfirstname', 'userlastname'],
                addresses: {
                    pk: 'addressid',
                    columns: ['addressid', 'address1', 'address2', 'zipcode'],
                    country: {
                        pk: 'country',
                        columns: {country: 'name', country_iso_code: 'country_iso_code'},
                        decomposeTo: 'object'
                    },
                    state: {
                        pk: 'state',
                        columns: {state: 'name', state_id: 'state_id'},
                        decomposeTo: 'object'
                    },
                    city: {
                        pk: 'city',
                        columns: {city: 'name', geoname_id: 'geoname_id'},
                        decomposeTo: 'object'
                    }
                },
            }
        })
        .then(function(result){
            console.log(result[0].addresses);
            res.status(200).send(result[0]);
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send(error);
        })
    }
}

module.exports = address;