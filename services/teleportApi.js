const axios = require ('axios');

const teleportApi = {
    getCountries: function(){
        return new Promise(function(resolve, reject){
            axios.get('https://api.teleport.org/api/countries/')
            .then(function(response){
                resolve(response.data._links['country:items'].map(function(element){
                    return { name: element.name, country_iso_code: element.href.substring(50, 52) }
                }));
            })
            .catch(function(error){
                reject(error);
            });
        });
    },
    getStatesByCountryIso: function(iso_code){
        return new Promise(function(resolve, reject){
            axios.get('https://api.teleport.org/api/countries/iso_alpha2:' + iso_code + '/admin1_divisions')
            .then(function(response){
                resolve(response.data._links['a1:items'].map(function(element){
                    return { name: element.name, country_iso_code: iso_code, state_id: element.href.substring(79, 81)};
                }));
            })
            .catch(function(error){
                reject(error);
            });
        });
    },
    
    getCitiesByCountryIsoAndStateGeoName: function(country_iso, state_id){
        return new Promise(function(resolve, reject){
            axios.get(`https://api.teleport.org/api/countries/iso_alpha2:${country_iso}/admin1_divisions/geonames:${state_id}/cities`)
            .then(function(response){
                resolve(response.data._links['city:items'].map(function(element){
                    return { name: element.name, geoname_id:  element.href.substring(46, 53)};
                }));
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
};

module.exports = teleportApi;