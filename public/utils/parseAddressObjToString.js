utils.constant('parseAddressObjToString',
  function (addressObj) {
    var out = addressObj.address1;

    if (addressObj.address2) {
      out += ', ' + addressObj.address2;
    }
    if (addressObj.city) {
      out += ', ' + addressObj.city;
    }
    if (addressObj.state) {
      out += ', ' + addressObj.state;
    }

    return out += ', ' + addressObj.country + ' (' + addressObj.zipcode + ')';
  }
);