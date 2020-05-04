const app = require('../index.js');
const db = app.get('db');

const address = {

    getAddresses: function (req, res) {
        db.address.find({
            userid: req.session.passport.user,
        }).then(function (result) {
            return res.status(200).send(result);
        })
        .catch(function (error) {
            return res.status(500).send(error);
        });
    },

    addAddress: async function (req, res) {

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
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

        return res.status(200).send({ message: 'Success' , result });
    },

    deleteAddress: async function(req, res){
        
        try{
            var deleteAddress = await db.address.destroy(req.body.addressid);
        } catch(error){
            return res.status(500).send(error);
        }

        return res.status(200).send({status: 'Ok', message: 'deleteAddress'});
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
            return res.status(200).send(result[0]);
        })
        .catch(function(error){
            console.log(error);
            return res.status(500).send(error);
        })
    }
}

module.exports = address;