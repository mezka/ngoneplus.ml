const teleportApi = require('../services/teleportApi');

const locationApiController = {
    getCountries: async function(req, res){ 
        try {
            var countryList = await teleportApi.getCountries();
        } catch (error) {
            res.status(500).send(error);
        }

        res.status(200).send(countryList);
    },

    getStatesByCountryIso: async function(req, res){

        try{
            var stateList = await teleportApi.getStatesByCountryIso(req.params.country_iso)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

        res.status(200).send(stateList);
    },

    getCitiesByCountryIsoAndStateGeoName: async function(req, res){
        try{
            var cityList = await teleportApi.getCitiesByCountryIsoAndStateGeoName(req.params.country_iso, req.params.geo_name);
        } catch (error) {
            res.status(500).send(error);
        }

        res.status(200).send(cityList);
    }
}


module.exports = locationApiController;