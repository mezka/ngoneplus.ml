SELECT * FROM users
LEFT OUTER JOIN address ON address.userid = users.userid;