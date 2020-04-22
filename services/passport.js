var passport = require('passport'),
  LocalStrategy = require('passport-local');

var bcrypt = require('bcryptjs');

function hashPasswordAndCompareToStoredHash(password, storedPasswordHash) {
  return bcrypt.compareSync(password, storedPasswordHash);
}

var app = require('../index');
var db = app.get('db');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function (email, password, done) {

  try {
     var user = await db.users.join({
      password: {
        decomposeTo: 'object',
      }
    }).find({ useremail: email }, { single: true });
  } catch (error) {
    return done(error);
  }

  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }

  if (hashPasswordAndCompareToStoredHash(password, user.password.passwordhash)) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect password.' });
  }
}));


passport.serializeUser(function (user, done) {
  return done(null, user.userid);
});

passport.deserializeUser(async function (userId, done) {
  try{
    var user = await db.users.findOne(userId)
  } catch (error) {
    return done(error, null);
  }

  return done(null, user);
});

module.exports = passport;
