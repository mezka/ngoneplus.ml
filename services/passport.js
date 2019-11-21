var passport = require('passport'),
  LocalStrategy = require('passport-local');

var bcrypt = require('bcryptjs');

function hashPasswordAndCompareToStoredHash(password, storedPasswordHash){
  return bcrypt.compareSync(password, storedPasswordHash);
}

var app = require('../index');
var db = app.get('db');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done){
      db.getUserAuthData([email])
      .then(result => {
        if(!result){
          return done(null, false, { message: 'Incorrect username.' });
        }
        user = result[0];

        if(hashPasswordAndCompareToStoredHash(password, user.storedpasswordhash)){
          return done(null, user);
        }else{
          return done(null, false, { message: 'Incorrect password.' });
        }
      })
      .catch(error => {
        return done(error);
      })
  }
));


passport.serializeUser(function(user, done){
  done(null, user.userid);
});

passport.deserializeUser(function(userId, done){
  db.getUserId([userId])
  .then(result => {
    done(null, result[0]);
  })
  .catch(error => {
    done(error, null);
  })
});

module.exports = passport;
