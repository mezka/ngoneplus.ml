var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var hash = bcrypt.hashSync('sebastiani2015');

console.log(hash);

console.log('Trying sebastiani2015 : ', bcrypt.compareSync('sebastiani2015', hash));
console.log('Trying kilogram : ', bcrypt.compareSync('kilogram', hash));
