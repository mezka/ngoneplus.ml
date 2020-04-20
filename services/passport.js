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

  let user = null;

  try {
     user = await db.users.join({
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
  done(null, user.userid);
});

passport.deserializeUser(function (userId, done) {
  db.getUserId([userId])
    .then(result => {
      done(null, result[0]);
    })
    .catch(error => {
      done(error, null);
    })
});

module.exports = passport;
