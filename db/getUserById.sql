SELECT useremail, userfirstname, userlastname, address.id AS addressid, address1, address2, city, state, country, zipcode, country_iso_code, state_id, geoname_id FROM Users
LEFT OUTER JOIN address ON address.userid = users.userid
LEFT OUTER JOIN locationdata ON locationdata.address_id = address.id
WHERE Users.userid = $1;